package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	usecase "github.com/rim0o8/nextjs-go-template/backend/usecase/user"

	"log/slog"
)

func (handler *UserController) Create(c *gin.Context) {
	var requestBody struct {
		Name string `json:"name" binding:"required"`
	}
	if err := c.ShouldBindJSON(&requestBody); err != nil {
		slog.Error("Failed to bind JSON", "error", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	Tx, err := handler.db.Client.Tx(c)
	if err != nil {
		slog.Error("Failed to start transaction", "error", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	uuid := uuid.New()
	usecase := usecase.NewCreateUserUseCase(handler.db.Client, c)
	err = usecase.Execute(
		uuid,
		requestBody.Name,
	)

	if err == nil {
		if err := Tx.Commit(); err == nil {
			slog.Info("User created successfully", "id", uuid)
			c.JSON(http.StatusOK, gin.H{"id": uuid})
			return
		} else {
			slog.Error("Failed to commit transaction", "error", err)
		}
	} else {
		slog.Error("Failed to execute use case", "error", err)
	}

	if err != nil {
		Tx.Rollback()
		slog.Error("Transaction rolled back due to error", "error", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
}
