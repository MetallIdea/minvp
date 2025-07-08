package tables

import (
	"fmt"
	"netdesk/modules/data"

	"gorm.io/gorm"
)

func CreateTable(prefix string, name string) *gorm.DB {
	return data.DB.Exec(fmt.Sprintf("CREATE TABLE \"%s_%s\" (id bigint NOT NULL,  PRIMARY KEY (id))", prefix, prefix))
}

func DropTable(prefix string, name string) *gorm.DB {
	return data.DB.Exec(fmt.Sprintf("DROP TABLE %s_%s", prefix, name))
}

func AddField(prefix string, name string, fieldName string, fieldType string) *gorm.DB {
	return data.DB.Exec(fmt.Sprintf("ALTER TABLE \"%s_%s\" ADD %s %s", prefix, name, fieldName, fieldType))
}