package sites

import (
	"netdesk/modules/data"
	"netdesk/modules/permissions"
)

type GetByFilterParams struct {
	CurrentUser *data.NdUser
	Where string
	Limit int
}

func getByFilter(params *GetByFilterParams) *data.GetAllResult[NdSite] {
	result := []NdSite{}
	var count int64
	query := data.DB.Where(params.Where)

	if params.Limit != 0 {
		query.Limit(params.Limit)
	}

	permissions.AddPermissionCondition(query, "sites", params.CurrentUser)

	query.Find(&result).Count(&count)

	return &data.GetAllResult[NdSite]{
		Data: result,
		TotalCount: count,
	}
}