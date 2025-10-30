using AvalphaTechnologies.CommissionCalculator.Models;
using System.Globalization;

namespace AvalphaTechnologies.CommissionCalculator.Services
{
    public class CommissionCalculatorService : ICommissionCalculator
    {
        // Bussiness rates
        private const decimal AvalphaLocalRate = 0.20m;         // 20%
        private const decimal AvalphaForeignRate = 0.35m;       // 35%
        private const decimal CompetitorLocalRate = 0.02m;      // 2%
        private const decimal CompetitorForeignRate = 0.0755m;  // 7.55%

        // Rounding currency amount to 2 decimal places
        private static decimal Round(decimal value) => Math.Round(value, 2, MidpointRounding.AwayFromZero);


        public CommissionCalculationResponse Calculate(CommissionCalculationRequest request)
        {
            // Fetch input values from request
            var localCount = request.LocalSalesCount;
            var foreignCount = request.ForeignSalesCount;
            var avgAmount = request.AverageSaleAmount;

            // Avalpha calculations
            var avalphaLocal = Round(AvalphaLocalRate * localCount * avgAmount);
            var avalphaForeign = Round(AvalphaForeignRate * foreignCount * avgAmount);
            var avalphaTotal = Round(avalphaLocal + avalphaForeign);

            // Competitor calculations
            var compLocal = Round(CompetitorLocalRate * localCount * avgAmount);
            var compForeign = Round(CompetitorForeignRate * foreignCount * avgAmount);
            var compTotal = Round(compLocal + compForeign);

            // Advantage calculation
            var advantage = Round(avalphaTotal - compTotal);

            // Format final amounts.
            var formattedTotalAvalpha = FormatCurrency(avalphaTotal, request.Currency);
            var formattedTotalCompetitor = FormatCurrency(compTotal, request.Currency);
            var formattedAdvantage = FormatCurrency(advantage, request.Currency);

            return new CommissionCalculationResponse
            {
                Currency = request.Currency ?? "GBP",
                Avalpha = new CommissionBreakdown
                {
                    LocalAmount = avalphaLocal,
                    ForeignAmount = avalphaForeign,
                    Total = avalphaTotal,
                    FormattedTotal = formattedTotalAvalpha
                },
                Competitor = new CommissionBreakdown
                {
                    LocalAmount = compLocal,
                    ForeignAmount = compForeign,
                    Total = compTotal,
                    FormattedTotal = formattedTotalCompetitor
                },
                AdvantageAmount = advantage,
                FormattedAdvantage = formattedAdvantage
            };
        }

        private string FormatCurrency(decimal amount, string? currency)
        {
            currency ??= "GBP";

            var culture = currency.ToUpperInvariant() switch
            {
                "GBP" => new CultureInfo("en-GB"),
                "USD" => new CultureInfo("en-US"),
                "EUR" => new CultureInfo("fr-FR"),
                _ => CultureInfo.InvariantCulture
            };

            try
            {
                return string.Format(culture, "{0:C2}", amount);
            }
            catch
            {
                return amount.ToString("F2");
            }
        }

    }
}
