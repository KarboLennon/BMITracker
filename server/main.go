package main

import "time"

type BMI struct {
	ID        int       `json:"id"`
	Berat     float64   `json:"berat"`
	Tinggi    float64   `json:"tinggi"`
	Umur      int       `json:"umur"`
	Kelamin   string    `json:"kelamin"`
	Nama      string    `json:"nama"`
	BMI       float64   `json:"bmi"`
	Status    string    `json:"status"`
	CreatedAt time.Time `json:"created_at"`
}
type TimeWrapper struct {
	time.Time
}
