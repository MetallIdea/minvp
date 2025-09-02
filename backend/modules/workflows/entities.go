package workflows

import (
	"time"

	"gorm.io/gorm"
)

type NdWorkflowSchedule struct {
	Seconds uint
}

type NdWorkflowAction struct {
	gorm.Model

	Type string

	Name string

	Parameters map[string]string  `gorm:"serializer:json"`
	Order uint
	
	ParentID uint
	WorkflowID uint
}

type NdWorkflow struct {
	gorm.Model

	Name string
	
	Schedule NdWorkflowSchedule `gorm:"serializer:json"`
	Status string
	LastActionID uint
	LastStartDate time.Time
	LastEndDate time.Time
	NextRunDate time.Time

	Actions []NdWorkflowAction `gorm:"foreignKey:WorkflowID"`
}