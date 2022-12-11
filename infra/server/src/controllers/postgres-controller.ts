import { Client, Pool } from "pg";

const postgresController = async () => {
  const client = new Client({
    user: "admin",
    password: "admin",
    port: 5432,
    host: "postgres-svc",
  });
  await client.connect();
  const res = await client.query("SELECT $1::text as message", [
    "Hello world!",
  ]);
  console.log(res);
  await client.end();
  const pool = new Pool({
    user: "admin",
    password: "admin",
    port: 5432,
    host: "postgres-svc",
  });
  pool.query("SELECT $1::text as message", ["Hello world!"]);
};

export default postgresController;
