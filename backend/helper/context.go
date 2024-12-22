package helper

import (
	"log/slog"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func GetUUIDFromPath(c *gin.Context, key string) (uuid.UUID, error) {
	id, err := uuid.Parse(c.Param(key))
	if err != nil {
		slog.Error("Failed to parse UUID from path parameter", "key", key, "value", c.Param(key), "error", err)
		return uuid.Nil, err
	}
	return id, nil
}
