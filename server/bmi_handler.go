package main

import (
	"database/sql"
	"encoding/json"
	"errors"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func SaveData(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		var bmi BMI
		err := json.NewDecoder(r.Body).Decode(&bmi)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		stmt, err := db.Prepare("INSERT INTO bmi_status (berat, tinggi, umur, kelamin, nama, bmi, status) VALUES (?, ?, ?, ?, ?, ?, ?)")

		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		defer stmt.Close()

		_, err = stmt.Exec(bmi.Berat, bmi.Tinggi, bmi.Umur, bmi.Kelamin, bmi.Nama, bmi.BMI, bmi.Status)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(bmi)
	}
}

func GetData(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		rows, err := db.Query("SELECT * FROM bmi_status")
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		var people []BMI
		for rows.Next() {
			var person BMI
			if err := rows.Scan(&person.ID, &person.Berat, &person.Tinggi, &person.Umur, &person.Kelamin, &person.Nama, &person.BMI, &person.Status, &TimeWrapper{}); err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			people = append(people, person)
		}
		if err := rows.Err(); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(people)
	}
}
func DeleteData(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		id := vars["id"]

		stmt, err := db.Prepare("DELETE FROM bmi_status WHERE id=?")
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		defer stmt.Close()

		_, err = stmt.Exec(id)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusOK)
	}
}
func UpdateData(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		id := vars["id"]

		var bmi BMI
		err := json.NewDecoder(r.Body).Decode(&bmi)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		stmt, err := db.Prepare("UPDATE bmi_status SET berat=?, tinggi=?, umur=?, nama=?, status=?, BMI=? WHERE id=?")
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		defer stmt.Close()

		_, err = stmt.Exec(bmi.Berat, bmi.Tinggi, bmi.Umur, bmi.Nama, bmi.Status, bmi.BMI, id)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(bmi)
	}
}

func (t *TimeWrapper) Scan(value interface{}) error {
	if value == nil {
		t.Time, _ = time.Parse("0001-01-01 00:00:00 +0000 UTC", "0001-01-01 00:00:00 +0000 UTC")
		return nil
	}
	if ts, ok := value.(time.Time); ok {
		t.Time = ts
		return nil
	}
	if bt, ok := value.([]byte); ok {
		parsedTime, err := time.Parse("2006-01-02 15:04:05", string(bt))
		if err != nil {
			return err
		}
		t.Time = parsedTime
		return nil
	}
	return errors.New("unsupported type for timewrapper")
}
func GetBMIByID(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		id := vars["id"]

		row := db.QueryRow("SELECT * FROM bmi_status WHERE id=?", id)
		var bmi BMI
		err := row.Scan(&bmi.ID, &bmi.Berat, &bmi.Tinggi, &bmi.Umur, &bmi.Kelamin, &bmi.Nama, &bmi.BMI, &bmi.Status, &TimeWrapper{})
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(bmi)
	}
}

func main() {
	r := mux.NewRouter()
	db := ConnectDB()
	defer db.Close()

	// Subrouter untuk endpoint /api/bmi/{id}
	subRouter := r.PathPrefix("/api/bmi/{id}").Subrouter()
	subRouter.HandleFunc("", UpdateData(db)).Methods("PUT")
	subRouter.HandleFunc("", DeleteData(db)).Methods("DELETE")

	// Endpoint untuk mendapatkan data berdasarkan ID
	r.HandleFunc("/api/bmi/{id}", GetBMIByID(db)).Methods("GET")

	// Endpoint untuk menyimpan data BMI baru
	r.HandleFunc("/api/bmi", SaveData(db)).Methods("POST")

	// Endpoint untuk mendapatkan semua data BMI
	r.HandleFunc("/api/bmi", GetData(db)).Methods("GET")

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowedMethods:   []string{"GET", "POST", "DELETE", "PUT"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	})
	handler := c.Handler(r)

	http.Handle("/", handler)
	log.Fatal(http.ListenAndServe(":4000", nil))
}
