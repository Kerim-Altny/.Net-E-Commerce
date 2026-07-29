using ECommerce.Application.Services.Orders;
using Microsoft.AspNetCore.Mvc;
namespace ECommerce.API.Controllers;

[ApiController]
[Route("api/[controller]")]

public class PaymentsController : ControllerBase
{
    private readonly IPaymentService _paymentService;
    private readonly IOrderService _orderService;

    public PaymentsController(IPaymentService paymentService, IOrderService orderService)
    {
        _paymentService = paymentService;
        _orderService = orderService;
    }

    [HttpPost("webhook")]
    public async Task<IActionResult> Webhook()
    {
        var json = await new StreamReader(Request.Body).ReadToEndAsync();
        var signature = Request.Headers["Stripe-Signature"].ToString();

        try
        {
            var sessionId = _paymentService.GetCompletedSessionId(json, signature);
            if (sessionId != null)
            {
                await _orderService.MarkOrderAsPaidAsync(sessionId);
            }
            return Ok();
        }
        catch (Stripe.StripeException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
    }
}