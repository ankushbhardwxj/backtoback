import mongoController from "./controllers/mongo-controller";
import postgresController from "./controllers/postgres-controller";

mongoController().catch((err) => console.log(err));
postgresController().catch((err) => console.log(err));
