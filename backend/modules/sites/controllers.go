package sites

import (
	"net/http"
	"netdesk/modules/data"

	"github.com/gin-gonic/gin"
)

type GetAllParams struct {
	Where string `form:"where"`
	Limit int `form:"limit"`
}

func getAll(c *gin.Context) {
	user := data.GetUserFromContext(c);

	var params GetAllParams
	c.Bind(&params)

	result := getByFilter(&GetByFilterParams{
		CurrentUser: user,
		Where: params.Where,
		Limit: params.Limit,
	})

	c.JSON(http.StatusOK, &result)
}