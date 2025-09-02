package tables

import (
	"fmt"
	"netdesk/modules/data"

	"gorm.io/gorm"
)

func CreateTable(prefix string, name string) *gorm.DB {
	return data.DB.Exec(fmt.Sprintf("CREATE TABLE \"%s_%s\" (id bigint NOT NULL,  PRIMARY KEY (id))", prefix, name))
}

func DropTable(prefix string, name string) *gorm.DB {
	return data.DB.Exec(fmt.Sprintf("DROP TABLE %s_%s", prefix, name))
}

func AddField(prefix string, name string, fieldName string, fieldType string) *gorm.DB {
	return data.DB.Exec(fmt.Sprintf("ALTER TABLE \"%s_%s\" ADD %s %s", prefix, name, fieldName, fieldType))
}

func InsertItem(prefix string, name string, item map[string]interface{}) *gorm.DB {
	fields := ""
	values := ""

	for field, value := range item {
		fields += fmt.Sprintf("%s,", field)
		values += fmt.Sprintf("%s,", value)
	}

	query := fmt.Sprintf("INSERT INTO \"%s_%s\" (%s) VALUES (%s)", prefix, name, fields, values)

	return data.DB.Exec(query)
}

type SelectItemsParams struct {
	Where string
	Select []string
	Limit uint
}

type SelectItemsResult struct {
	Data       []interface{}
	TotalCount int64
}

func SelectItems(prefix string, name string, params SelectItemsParams) SelectItemsResult {
	var result []interface{}
	var count int64

	table := fmt.Sprintf("%s_%s", prefix, name)
	fields := ""

	if len(params.Select) > 0 {
		for _, value := range params.Select {
			fields += fmt.Sprintf("%s,", value)
		}
	} else {
		fields = "*"
	}

	query := fmt.Sprintf("SELECT %s FROM %s WHERE %s", fields, table, params.Where)
	data.DB.Exec(query).Count(&count).Find(&result)

	return SelectItemsResult{
		Data: result,
		TotalCount: count,
	}
}