package user

import (
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/rim0o8/nextjs-go-template/backend/ent"
	repository "github.com/rim0o8/nextjs-go-template/backend/repository/user"
)

type GetAllUsersUseCase struct {
	userRepository repository.UserRepository
	context        *gin.Context
}

type GetAllUsersUseCaseResponse struct {
	ID   uuid.UUID `json:"id"`
	Name string    `json:"name"`
}

type GetAllUsersUseCaseResponseList []*GetAllUsersUseCaseResponse

func NewGetAllUsersUseCase(db *ent.Client, c *gin.Context) *GetAllUsersUseCase {
	userRepository := repository.CreateUserRepository(db)
	return &GetAllUsersUseCase{
		userRepository: *userRepository,
		context:        c,
	}
}

func (usecase *GetAllUsersUseCase) Execute() (GetAllUsersUseCaseResponseList, error) {
	users, err := usecase.userRepository.GetAll().All(usecase.context)
	if err != nil {
		return nil, err
	}

	res := make([]*GetAllUsersUseCaseResponse, 0, len(users))
	for _, user := range users {
		res = append(res, &GetAllUsersUseCaseResponse{
			ID:   user.ID,
			Name: user.Name,
		})
	}

	return res, nil
}
