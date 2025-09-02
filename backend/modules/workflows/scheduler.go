package workflows

import (
	"fmt"
	"time"

	"github.com/go-co-op/gocron/v2"
)

func calculateNextRun(workflow NdWorkflow) time.Time {
	
	return time.Now().Add(time.Duration(workflow.Schedule.Seconds) * time.Second)
}

func RunWorkflows(workflows []NdWorkflow) {
	for _, workflow := range workflows {
		fmt.Println("Run workflow: ", workflow.Name)

		workflow.Status = "in_progress"
		workflow.LastStartDate = time.Now()
		SaveWorkflow(workflow)

		result := RunWorkflow(workflow)

		if result.Error != nil {
			workflow.Status = "idle"
			fmt.Println(result.Error)
			SaveWorkflow(workflow)
		} else if result.Result {
			workflow.Status = "idle"
			workflow.LastEndDate = time.Now()
			workflow.NextRunDate = calculateNextRun(workflow)
			SaveWorkflow(workflow)
		} else {
			workflow.Status = "waiting"
			workflow.LastActionID = result.LastActionId
			println(result.Error)
			SaveWorkflow(workflow)
		}
	}
}

func RunScheduler() gocron.Scheduler {
	// create a scheduler
	s, err := gocron.NewScheduler()
	if err != nil {
		// handle error
	}

	fmt.Println("Search all workflows")
	workflows := GetAllWorkflowBySchedule()
	RunWorkflows(workflows)

	// add a job to the scheduler
	j, err := s.NewJob(
		gocron.DurationJob(
			5*time.Second,
		),
		gocron.NewTask(
			func() {
				fmt.Println("Search workflows")
				workflows := GetWorkflowBySchedule()
				RunWorkflows(workflows)
			},
		),
	)
	if err != nil {
		// handle error
	}
	// each job has a unique id
	fmt.Println("Scheduler run id: ", j.ID())

	// start the scheduler
	s.Start()

	return s
}