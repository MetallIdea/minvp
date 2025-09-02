package tables

import (
	"netdesk/modules/data"

	"gorm.io/gorm"
)

func GetTableById(id uint) (*NdTable, error) {
	var table NdTable

	result := data.DB.Preload("Fields").Where("id = ?", id).First(&table)

	if result.Error == nil {
		return &table, nil
	} 
	
	return nil, result.Error
}

func CreateItem(siteName string, table NdTable, item map[string]interface{}) *gorm.DB {
	return InsertItem(siteName, table.Name, item)
}

func GetItems(siteName string, table NdTable, params SelectItemsParams) SelectItemsResult {
	return SelectItems(siteName, table.Name, params)
}
