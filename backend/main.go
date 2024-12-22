package main

import (
	"log"

	"github.com/gin-gonic/gin"

	_ "github.com/lib/pq"
	"github.com/rim0o8/nextjs-go-template/backend/infra"
	"github.com/rim0o8/nextjs-go-template/backend/middleware"
)

func main() {
	client, driver := infra.InitDB()
	defer client.Close()
	defer driver.Close()

	// main
	r := gin.Default()
	r.Use(middleware.Cors())

	middleware.CreateRouter(r, infra.DB{Client: client})

	if err := r.Run("0.0.0.0:8080"); err != nil {
		log.Fatal(err)
	}
}
