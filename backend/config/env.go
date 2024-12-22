package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Env struct {
	Env string

	DbPassword string
	DbUser     string
	DbName     string
	DbHost     string
	DbPort     string
}

var env *Env

func init() {
	env = &Env{}
	setEnv()
}

func GetEnv() Env {
	return *env
}

func setEnv() {
	env.Env = os.Getenv("ENV")
	if env.Env != "production" {
		err := godotenv.Load()
		if err != nil {
			log.Fatal("Error loading .env file")
		}
	}

	mustGetenv := func(key string) string {
		v := os.Getenv(key)
		if v == "" {
			log.Fatalf("env %s is required", key)
		}
		return v
	}

	env.Env = mustGetenv("ENV")
	env.DbPassword = mustGetenv("DB_PASSWORD")
	env.DbUser = mustGetenv("DB_USER")
	env.DbName = mustGetenv("DB_NAME")
	env.DbHost = mustGetenv("DB_HOST")
	env.DbPort = mustGetenv("DB_PORT")
}
