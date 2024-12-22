package middleware

import (
	"github.com/gin-gonic/gin"
	userController "github.com/rim0o8/nextjs-go-template/backend/controller/user"
	"github.com/rim0o8/nextjs-go-template/backend/infra"
)

func CreateRouter(r *gin.Engine, db infra.DB) {
	user := userController.NewUserController(db)

	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "ok",
		})
	})

	r.GET("/users", user.GetAll)
	r.POST("/users", user.Create)
}
