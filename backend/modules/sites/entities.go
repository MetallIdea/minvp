package sites

import "gorm.io/gorm"

type NdSite struct {
	gorm.Model

	Name string
	IsPublic bool
	Type string
	UserId int
	Title string
	Path string
	Css string
}