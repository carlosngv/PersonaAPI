import { envs } from "./config/envs";
import { MongoConnection } from "./data/mongo/mongo-connection";
import { Routes } from "./presentation/routes";
import { Server } from "./presentation/server";

( async() => {
    await main();
})();


async function main() {

    await MongoConnection.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DATABASE,
    });

    const server = new Server({
        port: envs.PORT,
        routes: Routes.routes,
    });

    await server.start();
}
