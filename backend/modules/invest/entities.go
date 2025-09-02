package invest

import (
	"time"

	"gorm.io/gorm"
)

type InvestBond struct {
	gorm.Model

	CountryOfRisk          string
	CountryOfRiskName string
	SellAvailableFlag         bool
	Sector          string
	Name    string
	Currency string
	MaturityDate time.Time
	InitialNominal uint

	BuyAvailableFlag bool
	Ticker string
	ApiTradeAvailableFlag bool
	MinPriceIncrement uint
	ISIN string
	FIGI string
}

type InvestCandle struct {
	gorm.Model

	InstrumentId string
	Interval string

	Time time.Time
	Open uint
	Close uint
	Low uint
	High uint
	Volume uint
	IsComplete bool
}