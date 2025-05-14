package data

import (
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() {
    dsn := "host=localhost user=postgres dbname=netdesk password=test sslmode=disable"
    session, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if (err != nil) {
		log.Fatal(err)
	}

	DB = session
}