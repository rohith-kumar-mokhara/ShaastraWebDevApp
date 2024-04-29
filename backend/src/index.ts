import { ApolloServer } from "@apollo/server";
import * as express from "express";
import { buildSchema } from "type-graphql";
import { DataSource } from "typeorm";
import "reflect-metadata";
import cors = require("cors");
import { TaskResolver } from "./resolvers/TaskResolver";
import { startStandaloneServer } from "@apollo/server/standalone";
import * as dotenv from "dotenv"

console.log(process.env.USER, process.env.PASSWORD)
dotenv.config()

const connectDB = new DataSource({
  type: "postgres",
  url: `postgres://${process.env.USER}:${process.env.PASSWORD}@localhost:5433/tasks`,
  logging: true,
  synchronize: true,
  entities: ["./src/entity/**/*.ts"],
});

const main = async () => {
  connectDB
    .initialize()
    .then(() => {
      console.log(`Data Source has been initialized`);
    })
    .catch((err) => {
      console.error(`Data Source initialization error`, err);
    });

  const schema = await buildSchema({
    resolvers: [TaskResolver],
  });

  const server = new ApolloServer({ schema });

  const app = express();

  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`Server is ready at ${url}`);
};

main();
