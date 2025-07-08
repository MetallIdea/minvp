package tables

import (
	"gorm.io/gorm"
)

type NdField struct {
	gorm.Model

	Name string
	Title string
	Type string
	IsMultiple bool
	LinkedTableId uint

  	TableID uint
}

type NdTable struct {
	gorm.Model

	Name string
	Title string

	Fields []NdField `gorm:"foreignKey:TableID"`
	SiteID uint
}