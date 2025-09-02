package workflows

import (
	"encoding/json"
	"fmt"
	"netdesk/modules/sites"
	"netdesk/modules/tables"
	"netdesk/utils"
	"strings"
)

func actionIf(action NdWorkflowAction, context map[string]interface{}) (bool, error) {
	fmt.Println("Run action: ", action.Name)
	output, err := utils.Execute(action.Parameters["code"], context)
	if err != nil {
		return false, err
	}

	result := output.(bool)

	actions := GetWorkflowChildrenActions(action.ID)

	if (result && len(actions) > 0) {
		return runAction(actions[0], context)
	} else if (!result && len(actions) > 1) {
		return runAction(actions[1], context)
	}

	return true, nil
}

func actionSetVariable(action NdWorkflowAction, context map[string]interface{}) (bool, error) {
	fmt.Println("Run action: ", action.Name)
	output, err := utils.Execute(action.Parameters["value"], context)
	if err != nil {
		return false, err
	}

	context[action.Parameters["variable"]] = output
	return true, nil
}

func actionRequest(action NdWorkflowAction, context map[string]interface{}) (bool, error) {
	fmt.Println("Run action: ", action.Name)

	headers := make(map[string]string)
	json.Unmarshal([]byte(action.Parameters["header"]), &headers)

	result := utils.Request[any](utils.RequestParams{
		Method: action.Parameters["method"],
		Url: action.Parameters["url"],
		Body: action.Parameters["body"],
		Headers: headers,
	})

	context[action.Parameters["variable"]] = result

	return true, nil
}

func actionSaveItem(action NdWorkflowAction, context map[string]interface{}) (bool, error) {
	fmt.Println("Run action: ", action.Name)

	site := sites.GetById(1)

	tableId, _ := utils.ParseUint(action.Parameters["tableId"])
	table, _ := tables.GetTableById(tableId)

	tables.CreateItem(site.Name, *table, context[action.Parameters["item"]].(map[string]interface{}))
	return true, nil
}

func actionGetItems(action NdWorkflowAction, context map[string]interface{}) (bool, error) {
	fmt.Println("Run action: ", action.Name)

	site := sites.GetById(1)

	tableId, _ := utils.ParseUint(action.Parameters["tableId"])
	table, _ := tables.GetTableById(tableId)

	where, _ := utils.Execute(action.Parameters["where"], context)

	context[action.Parameters["result"]] = tables.GetItems(site.Name, *table, tables.SelectItemsParams{
		Select: strings.Split(action.Parameters["select"], ","),
		Where: where.(string),
	})
	return true, nil
}
