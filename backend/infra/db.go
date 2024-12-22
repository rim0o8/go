package infra

import (
	"context"
	"fmt"

	"entgo.io/ent/dialect"
	"entgo.io/ent/dialect/sql"
	"github.com/rim0o8/nextjs-go-template/backend/config"
	"github.com/rim0o8/nextjs-go-template/backend/ent"
	"github.com/rim0o8/nextjs-go-template/backend/ent/migrate"
)

type DB struct {
	Client *ent.Client
}

func createDBClient() (*ent.Client, *sql.Driver, error) {
	env := config.GetEnv()

	var client *ent.Client
	var driver *sql.Driver
	var err error

	if env.Env != "production" {
		dsn := fmt.Sprintf("host=%s port=%s user=%s dbname=%s password=%s sslmode=disable", env.DbHost, env.DbPort, env.DbUser, env.DbName, env.DbPassword)
		client, err = ent.Open(dialect.Postgres, dsn)
		if err != nil {
			return nil, nil, err
		}
	} else {
		// todo: implement production db connection
		return nil, nil, err
	}
	return client, driver, nil
}

func migrateDB(client *ent.Client) error {
	ctx := context.Background()
	err := client.Debug().Schema.Create(
		ctx,
		migrate.WithDropIndex(true),
		migrate.WithDropColumn(true),
	)
	return err
}

func InitDB() (
	*ent.Client,
	*sql.Driver,
) {
	client, driver, err := createDBClient()
	if err != nil {
		panic(err)
	}

	err = migrateDB(client)
	if err != nil {
		panic(err)
	}

	return client, driver
}
