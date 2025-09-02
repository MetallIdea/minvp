package workflows

import (
	"netdesk/modules/data"

	"github.com/gin-gonic/gin"
)

func InitModule(api *gin.RouterGroup) {
	data.DB.AutoMigrate(&NdWorkflowAction{})
	data.DB.AutoMigrate(&NdWorkflow{})

	api.GET("/workflows", data.GetAll[NdWorkflow])
	api.GET("/workflows/:id", getById)
	api.POST("/workflows", save)
	api.DELETE("/workflows/:id", delete)
	
	api.POST("/workflows/:id/actions", saveAction)
}