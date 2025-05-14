package block_templates

import (
	"netdesk/modules/data"

	"github.com/gin-gonic/gin"
)

func InitModule(api *gin.RouterGroup) {
	data.DB.AutoMigrate(&NdBlockTemplate{})

	api.GET("/block_templates", data.GetAll[NdBlockTemplate])
	api.GET("/block_templates/:id", data.GetById[NdBlockTemplate])
	api.POST("/block_templates", data.Save[NdBlockTemplate])
	api.DELETE("/block_templates/:id", data.Delete[NdBlockTemplate])
}