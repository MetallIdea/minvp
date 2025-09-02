package invest

import (
	"errors"
	"fmt"
	"netdesk/modules/data"
	"netdesk/utils"
	"time"
)

func ActionGetAllCandles() (bool, error) {
	fmt.Println("Run action: Заспросить и сохранить свечи")

	var bonds []InvestBond
	data.DB.Find(&bonds)

	for _, bond := range bonds {
		result := GetBondCandlesByTime(GetBondCandlesByTimeParams{
			BondFigi: bond.FIGI,
			From: "2025-07-20T00:00:00.000Z",
			To: "2025-07-24T00:00:00.000Z",
			Interval: "CANDLE_INTERVAL_DAY",
		})

		if result["candles"] != nil {
			candles := result["candles"].([]interface{})

			for _, value := range candles {
				candle := value.(map[string]interface{})

				parsedTime, _ := time.Parse(time.RFC3339, candle["time"].(string))
				openPercent, _ := utils.ParseUint(candle["open"].(map[string]interface{})["unit"].(string))
				closePercent, _ := utils.ParseUint(candle["close"].(map[string]interface{})["unit"].(string))

				var exist InvestCandle
				result := data.DB.First(&exist, InvestCandle{
					InstrumentId: bond.FIGI,
					Time: parsedTime,
				});

				if result.Error != nil {
					data.DB.Save(&InvestCandle{
						InstrumentId: bond.FIGI,
						Time: parsedTime,
						Open: bond.InitialNominal * openPercent,
						Close: bond.InitialNominal * closePercent,
					})
				}
			}
		}
	}

	return true, nil
}

func ActionGetAllBonds() (bool, error) {
	fmt.Println("Run action: Заспросить и сохранить акции")

	bonds := GetAllBonds()

	if bonds["error"] != nil {
		return false, errors.New(bonds["error"].(string))
	}

	instruments := bonds["instruments"].([]interface{})

	for _, value := range instruments {
		bond := value.(map[string]interface{})
		var exist InvestBond
		result := data.DB.First(&exist, InvestBond{
			ISIN: bond["isin"].(string),
		});

		var parsedMaturityDate time.Time
		if (bond["maturityDate"] != nil) {
			parsedMaturityDate, _ = time.Parse(time.RFC3339, bond["maturityDate"].(string))
		}
		initialNominal := bond["initialNominal"].(map[string]interface{})

		if result.Error != nil {
			data.DB.Save(&InvestBond{
				ISIN: bond["isin"].(string),
			})
		} else {
			exist.ApiTradeAvailableFlag = bond["apiTradeAvailableFlag"].(bool)
			exist.BuyAvailableFlag = bond["buyAvailableFlag"].(bool)
			exist.CountryOfRisk = bond["countryOfRisk"].(string)
			exist.CountryOfRiskName = bond["countryOfRiskName"].(string)
			exist.FIGI = bond["figi"].(string)
			exist.Name = bond["name"].(string)
			exist.Sector = bond["sector"].(string)
			exist.Currency = bond["currency"].(string)
			exist.SellAvailableFlag = bond["sellAvailableFlag"].(bool)
			exist.Ticker = bond["ticker"].(string)
			exist.MaturityDate = parsedMaturityDate
			exist.InitialNominal, _ = utils.ParseUint(initialNominal["units"].(string))
			data.DB.Save(&exist)
		}
	}

	return true, nil
}
