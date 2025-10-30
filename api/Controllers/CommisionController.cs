using Microsoft.AspNetCore.Mvc;
using AvalphaTechnologies.CommissionCalculator.Services;
using AvalphaTechnologies.CommissionCalculator.Models;

namespace AvalphaTechnologies.CommissionCalculator.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CommisionController : ControllerBase
    {
        private readonly ICommissionCalculator _calculator;

        public CommisionController(ICommissionCalculator calculator)
        {
            _calculator = calculator;
        }

        [HttpPost("calculate")]
        [ProducesResponseType(typeof(CommissionCalculationResponse), 200)]
        public IActionResult Calculate([FromBody] CommissionCalculationRequest request)
        {
            var result = _calculator.Calculate(request);
            return Ok(result);
        }
    }

}
