package block_templates

import "gorm.io/gorm"

type NdBlockTemplate struct {
	gorm.Model

	Name string
	IsPublic bool
	Type string
	UserId int
	Css string
	Props string
	TemplateJSON string
}