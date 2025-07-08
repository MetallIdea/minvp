package tables

import (
	"netdesk/modules/data"

	"github.com/gin-gonic/gin"
)

func InitModule(api *gin.RouterGroup) {
	data.DB.AutoMigrate(&NdField{})
	data.DB.AutoMigrate(&NdTable{})

	api.GET("/tables", data.GetAll[NdTable])
	api.GET("/tables/:id", getById)
	api.POST("/tables", save)
	api.DELETE("/tables/:id", delete)
	
	api.POST("/tables/:id/fields", saveField)
}