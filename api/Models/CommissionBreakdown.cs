namespace AvalphaTechnologies.CommissionCalculator.Models
{
    public class CommissionBreakdown
    {
        public decimal LocalAmount { get; set; }
        public decimal ForeignAmount { get; set; }
        public decimal Total { get; set; }
        public string FormattedTotal { get; set; } = string.Empty;
    }
}
