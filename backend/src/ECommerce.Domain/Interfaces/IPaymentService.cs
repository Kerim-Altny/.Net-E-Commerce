public interface IPaymentService
{
    Task<CheckoutSessionResult> CreateCheckoutSessionAsync(Order order, string successUrl, string cancelUrl);
    string? GetCompletedSessionId(string requestBody, string signatureHeader);
}

public record CheckoutSessionResult(string SessionId, string CheckoutUrl);