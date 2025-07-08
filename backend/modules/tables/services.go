package tables

import "netdesk/modules/data"

func GetTableById(id uint) (*NdTable, error) {
	var table NdTable

	result := data.DB.Preload("Fields").Where("id = ?", id).First(&table)

	if result.Error == nil {
		return &table, nil
	} 
	
	return nil, result.Error
}