package tables

import (
	"fmt"
	"net/http"
	"netdesk/modules/data"
	"netdesk/modules/sites"
	"netdesk/utils"
	"strconv"

	"github.com/gin-gonic/gin"
)

type GetAllParams struct {
	Where string `form:"where"`
	Limit int    `form:"limit"`
}

type GetAllResult struct {
	Data       []NdTable
	TotalCount int64
}

func getById(c *gin.Context) {
	id, _ := utils.ParseUint(c.Param("id"))

	table, err := GetTableById(id)
		fmt.Print(err)

	if err == nil {
		c.JSON(http.StatusOK, table)
	} else {
		c.Status(http.StatusNotFound)
	}
}

func save(c *gin.Context) {
	var newData NdTable
	c.Bind(&newData)

	site := sites.GetById(newData.SiteID)

	if (newData.ID == 0) {
		resultCreate := CreateTable(site.Name, newData.Name)

		if resultCreate.Error != nil {
			c.Status(http.StatusInternalServerError)
			return
		}
	}

	result := data.DB.Save(&newData)
	
	if result.Error == nil {
		c.JSON(http.StatusOK, newData)
	} else {
		c.Status(http.StatusNotFound)
	}
}

func delete(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))

	var table NdTable

	resultTable := data.DB.Where("id = ?", id).First(&table)

	if resultTable.Error != nil {
		c.Status(http.StatusNotFound)
		return
	}

	site := sites.GetById(table.SiteID)

	DropTable(site.Name, table.Name)

	result := data.DB.Where("id = ?", id).Delete(&NdTable{})
	
	if result.Error == nil {
		c.Status(http.StatusOK)
	} else {
		c.Status(http.StatusNotFound)
	}
}

func saveField(c *gin.Context) {
	id, _ := utils.ParseUint(c.Param("id"))
	var newData NdField
	c.Bind(&newData)

	table, err := GetTableById(id)

	if err != nil {
		c.Status(http.StatusNotFound)
	}

	site := sites.GetById(table.SiteID)

	resultCreate := AddField(site.Name, table.Name, newData.Name, newData.Type)

	if resultCreate.Error != nil {
		c.Status(http.StatusInternalServerError)
		return
	}

	newData.TableID = table.ID;

	result := data.DB.Save(&newData)
	
	if result.Error == nil {
		c.JSON(http.StatusOK, newData)
	} else {
		c.Status(http.StatusNotFound)
	}
}