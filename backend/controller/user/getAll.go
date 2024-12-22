package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	usecase "github.com/rim0o8/nextjs-go-template/backend/usecase/user"
)

func (handler *UserController) GetAll(c *gin.Context) {
	usecase := usecase.NewGetAllUsersUseCase(handler.db.Client, c)
	res, err := usecase.Execute()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, res)
}
