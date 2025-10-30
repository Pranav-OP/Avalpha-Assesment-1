using AvalphaTechnologies.CommissionCalculator.Models;
using AvalphaTechnologies.CommissionCalculator.Services;
using Xunit;

namespace AvalphaTechnologies.CommissionCalculator.Tests
{
    public class CommissionCalculatorTests
    {
        private readonly CommissionCalculatorService _calculator = new CommissionCalculatorService();

        [Fact] // define single test with fixed input
        public void Calculate_ShouldReturnExpectedValues_ForSampleInput()
        {
            // Arrange
            var request = new CommissionCalculationRequest
            {
                LocalSalesCount = 10,
                ForeignSalesCount = 10,
                AverageSaleAmount = 100m,
                Currency = "GBP"
            };

            // Act
            var result = _calculator.Calculate(request);

            // Assert (expected vs actual)
            Assert.Equal(200.00m, result.Avalpha.LocalAmount);
            Assert.Equal(350.00m, result.Avalpha.ForeignAmount);
            Assert.Equal(550.00m, result.Avalpha.Total);

            Assert.Equal(20.00m, result.Competitor.LocalAmount);
            Assert.Equal(75.50m, result.Competitor.ForeignAmount);
            Assert.Equal(95.50m, result.Competitor.Total);

            Assert.Equal(454.50m, result.AdvantageAmount);
        }

        [Theory] // A parameterized test
        [InlineData(0, 0, 100, 0, 0)]
        [InlineData(5, 0, 200, 200, 20)]
        [InlineData(0, 10, 50, 175, 37.75)]
        public void Calculate_VariousInputs_ExpectedTotals(
            int localSales, int foreignSales, decimal avgAmount,
            decimal expectedAvalphaTotal, decimal expectedCompetitorTotal)
        {
            // Arrange
            var request = new CommissionCalculationRequest
            {
                LocalSalesCount = localSales,
                ForeignSalesCount = foreignSales,
                AverageSaleAmount = avgAmount
            };

            // Act
            var result = _calculator.Calculate(request);

            // Assert
            Assert.Equal(expectedAvalphaTotal, result.Avalpha.Total);
            Assert.Equal(expectedCompetitorTotal, result.Competitor.Total);
        }
    }
}
