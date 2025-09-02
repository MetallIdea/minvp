package workflows

import (
	"net/http"
	"netdesk/modules/data"
	"netdesk/utils"
	"strconv"

	"github.com/gin-gonic/gin"
)

type GetAllParams struct {
	Where string `form:"where"`
	Limit int    `form:"limit"`
}

type GetAllResult struct {
	Data       []NdWorkflow
	TotalCount int64
}

func getById(c *gin.Context) {
	id, _ := utils.ParseUint(c.Param("id"))

	table, err := GetWorkflowById(id)

	if err == nil {
		c.JSON(http.StatusOK, table)
	} else {
		c.Status(http.StatusNotFound)
	}
}

func save(c *gin.Context) {
	var newData NdWorkflow
	c.Bind(&newData)

	result := data.DB.Save(&newData)
	
	if result.Error == nil {
		c.JSON(http.StatusOK, newData)
	} else {
		c.Status(http.StatusNotFound)
	}
}

func delete(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))

	result := data.DB.Where("id = ?", id).Delete(&NdWorkflow{})
	
	if result.Error == nil {
		c.Status(http.StatusOK)
	} else {
		c.Status(http.StatusNotFound)
	}
}

func saveAction(c *gin.Context) {
	id, _ := utils.ParseUint(c.Param("id"))
	var newData NdWorkflowAction
	c.Bind(&newData)

	newData.WorkflowID = id;

	result := data.DB.Save(&newData)
	
	if result.Error == nil {
		c.JSON(http.StatusOK, newData)
	} else {
		c.Status(http.StatusNotFound)
	}
}