package workflows

import (
	"netdesk/modules/data"

	"gorm.io/gorm"
)

func GetWorkflowById(id uint) (*NdWorkflow, error) {
	var workflow NdWorkflow

	result := data.DB.Preload("Actions").Where("id = ?", id).First(&workflow)

	if result.Error == nil {
		return &workflow, nil
	} 
	
	return nil, result.Error
}

func GetAllWorkflowBySchedule() []NdWorkflow {
	var workflows []NdWorkflow
	data.DB.Model(&NdWorkflow{}).
		Where("\"next_run_date\" <= CURRENT_TIMESTAMP").
		Find(&workflows)

	return workflows
}

func GetWorkflowBySchedule() []NdWorkflow {
	var workflows []NdWorkflow
	data.DB.Model(&NdWorkflow{}).
		Where("\"next_run_date\" <= CURRENT_TIMESTAMP AND \"status\" <> 'in_progress'").
		Find(&workflows)

	return workflows
}

func SaveWorkflow(workflow NdWorkflow) *gorm.DB {
	return data.DB.Save(&workflow)
}

func GetWorkflowRootActions(id uint) []NdWorkflowAction {
	var actions []NdWorkflowAction
	data.DB.Where("workflow_id = ? AND parent_id IS NULL", id).
		Order("\"order\" ASC").
		Find(&actions)

	return actions
}

func GetWorkflowChildrenActions(actionId uint) []NdWorkflowAction {
	var actions []NdWorkflowAction
	data.DB.Where("parent_id = ?", actionId).Find(&actions)

	return actions
}
