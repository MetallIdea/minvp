package workflows

import (
	"fmt"
	"netdesk/modules/invest"
)

type ActionResult struct {
	Result bool
	Error error
	LastActionId uint
}

func runAction(action NdWorkflowAction, context map[string]interface{}) (bool, error) {
	switch action.Type {
	case "if":
		return actionIf(action, context)
	case "set_variable":
		return actionSetVariable(action, context)
	case "request":
		return actionRequest(action, context)
	case "save_item":
		return actionSaveItem(action, context)
	case "get_items":
		return actionGetItems(action, context)
	case "get_invest_bonds":
		return invest.ActionGetAllBonds()
	case "get_invest_candles":
		return invest.ActionGetAllCandles()
	}

	return false, nil
}

func RunWorkflow(workflow NdWorkflow) ActionResult {
	context := map[string]interface{}{
		"sprintf": fmt.Sprintf,
	}

	actions := GetWorkflowRootActions(workflow.ID)

	for _, action := range actions {
		result, err := runAction(action, context)

		// Если результат не выполнен
		if !result {
			return ActionResult{ Result: false, LastActionId: action.ID, Error: err }
		}
	}

	return ActionResult{ Result: true }
}