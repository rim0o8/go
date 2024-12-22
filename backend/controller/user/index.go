package controller

import "github.com/rim0o8/nextjs-go-template/backend/infra"

type UserController struct {
	db infra.DB
}

func NewUserController(db infra.DB) *UserController {
	return &UserController{db: db}
}
