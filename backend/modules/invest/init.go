package invest

import "netdesk/modules/data"

func InitModule() {
	data.DB.AutoMigrate(&InvestBond{})
	data.DB.AutoMigrate(&InvestCandle{})
}