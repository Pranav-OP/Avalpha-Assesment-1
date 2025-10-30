using AvalphaTechnologies.CommissionCalculator.Models;

namespace AvalphaTechnologies.CommissionCalculator.Services
{
    public interface ICommissionCalculator
    {
        CommissionCalculationResponse Calculate(CommissionCalculationRequest request);
    }
}
