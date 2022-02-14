module.exports = {
      "type": "postgres",
      "host": "ec2-34-205-46-149.compute-1.amazonaws.com",
      "port": 5432,
      "username": "tezroycrpldocy",
      "password": "4ccb18d649a01672524cb86ddd6daacbbacfc964df193368515419f9ac13bd31",
      "database": "da5t461qp6mqb2",
      "synchronize":false,
      "extra":{
            "ssl":{
                  "require":true,
                  "rejectUnauthorized":false
            }
      },
      entities: ["src/app/models/*.ts"],
      migrations: ["src/database/migrations/*.ts"],
      cli: {
            migrationsDir: "src/database/migrations",
      },
};
