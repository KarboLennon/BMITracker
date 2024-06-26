package main

import (
	"database/sql"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

func ConnectDB() *sql.DB {
	db, err := sql.Open("mysql", "root@tcp(127.0.0.1:3306)/bmi")
	if err != nil {
		log.Fatal(err)
	}
	return db
}
