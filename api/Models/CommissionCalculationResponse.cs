namespace AvalphaTechnologies.CommissionCalculator.Models
{
    public class CommissionCalculationResponse
    {
        public CommissionBreakdown Avalpha { get; set; } = new CommissionBreakdown();
        public CommissionBreakdown Competitor { get; set; } = new CommissionBreakdown();

        public decimal AdvantageAmount { get; set; }
        public string FormattedAdvantage { get; set; } = string.Empty;

        public string Currency { get; set; } = "GBP";
    }
}
