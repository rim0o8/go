package user

import (
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/rim0o8/nextjs-go-template/backend/ent"
	repository "github.com/rim0o8/nextjs-go-template/backend/repository/user"
)

type CreateUserUseCase struct {
	userRepository repository.UserRepository
	context        *gin.Context
}

func NewCreateUserUseCase(db *ent.Client, c *gin.Context) *CreateUserUseCase {
	userRepository := repository.CreateUserRepository(db)
	return &CreateUserUseCase{
		userRepository: *userRepository,
		context:        c,
	}
}

func (usecase *CreateUserUseCase) Execute(
	userId uuid.UUID,
	name string,
) error {
	_, err := usecase.userRepository.Create(userId, name).Save(usecase.context)
	if err != nil {
		return err
	}
	return nil
}
