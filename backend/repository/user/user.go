package repository

import (
	"github.com/google/uuid"
	"github.com/rim0o8/nextjs-go-template/backend/ent"
	"github.com/rim0o8/nextjs-go-template/backend/ent/user"
)

type UserRepository struct {
	client *ent.Client
}

func CreateUserRepository(client *ent.Client) *UserRepository {
	return &UserRepository{client: client}
}

func (r *UserRepository) GetByID(uesrId uuid.UUID) *ent.UserQuery {
	return r.client.User.Query().Where(user.ID(uesrId))
}

func (r *UserRepository) GetAll() *ent.UserQuery {
	return r.client.User.Query()
}

func (r *UserRepository) Create(
	userId uuid.UUID,
	name string,

) *ent.UserCreate {
	return r.client.User.Create().
		SetID(userId).
		SetName(name)
}
