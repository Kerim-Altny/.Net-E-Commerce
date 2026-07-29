using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Configuration;
using Stripe;
using Stripe.Checkout;

namespace ECommerce.Infrastructure.Payments;

public class StripePaymentService : IPaymentService
{
    private readonly IConfiguration _configuration;
    private readonly StripeClient _stripeClient;

    public StripePaymentService(IConfiguration configuration, StripeClient stripeClient)
    {
        _configuration = configuration;
        _stripeClient = stripeClient;
    }

    public async Task<CheckoutSessionResult> CreateCheckoutSessionAsync(Order order, string successUrl, string cancelUrl)
    {
        var options = new SessionCreateOptions
        {
            Mode = "payment",
            ClientReferenceId = order.Id.ToString(),
            SuccessUrl = successUrl,
            CancelUrl = cancelUrl,
            PaymentMethodTypes = new List<string> { "card" },
            LineItems = order.OrderItems.Select(item => new SessionLineItemOptions
            {
                PriceData = new SessionLineItemPriceDataOptions
                {
                    UnitAmount = (long?)Math.Round(item.UnitPriceAtPurchase * 100, MidpointRounding.AwayFromZero),
                    Currency = "usd",
                    ProductData = new SessionLineItemPriceDataProductDataOptions
                    {
                        Name = item.ProductTitleSnapshot,
                    },
                },
                Quantity = item.Quantity,
            }).ToList(),

        };

        var session = await _stripeClient.V1.Checkout.Sessions.CreateAsync(options);

        return new CheckoutSessionResult(session.Id, session.Url);
    }

    public string? GetCompletedSessionId(string requestBody, string signatureHeader)
    {
        var endpointSecret = _configuration["Stripe:WebhookSecret"]
            ?? throw new InvalidOperationException("Stripe:WebhookSecret is not configured.");

        if (!IsValidSignature(requestBody, signatureHeader, endpointSecret))
        {
            throw new StripeException("Webhook signature verification failed.");
        }

        using var eventJson = JsonDocument.Parse(requestBody);
        var eventType = eventJson.RootElement.GetProperty("type").GetString();
        if (eventType != "checkout.session.completed")
        {
            return null;
        }

        return eventJson.RootElement.GetProperty("data").GetProperty("object").GetProperty("id").GetString();
    }

    // Stripe.net 52.1.1's EventUtility.ConstructEvent cannot parse the newer
    // Stripe-Signature header format (which adds a "v0=" scheme alongside "t="/"v1=")
    // and throws on every event. The "v1" scheme (HMAC-SHA256 over "{timestamp}.{body}")
    // is unchanged, so we verify it directly instead of waiting on an SDK update.
    private static bool IsValidSignature(string payload, string signatureHeader, string secret)
    {
        string? timestamp = null;
        string? v1Signature = null;

        foreach (var part in signatureHeader.Split(','))
        {
            var pair = part.Split('=', 2);
            if (pair.Length != 2)
            {
                continue;
            }

            if (pair[0] == "t")
            {
                timestamp = pair[1];
            }
            else if (pair[0] == "v1")
            {
                v1Signature = pair[1];
            }
        }

        if (timestamp == null || v1Signature == null)
        {
            return false;
        }

        var signedPayload = $"{timestamp}.{payload}";
        using var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(secret));
        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(signedPayload));
        var computedSignature = Convert.ToHexStringLower(computedHash);

        return CryptographicOperations.FixedTimeEquals(
            Encoding.UTF8.GetBytes(computedSignature),
            Encoding.UTF8.GetBytes(v1Signature));
    }
}