import { envs } from "./config";
import { MySQLDatabase } from "./data/mysql";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

const serverInstance = new Server({ 
    host: envs.HOST,
    port: envs.PORT,
    routes: AppRoutes.routes
});

(async () => {
    try {
        await MySQLDatabase.connect({
            host: envs.HOST_DB,
            port: envs.PORT_DB,
            username: envs.USERNAME_DB,
            password: envs.PASSWORD_DB ?? '',
            database: envs.DATABASE_DB,
        });

        await serverInstance.start();
    } catch (error) {
        console.error("Failed to connect to the database:", error);
        process.exit(1);
    }
})();

export const io = serverInstance.io; // Exportar io
