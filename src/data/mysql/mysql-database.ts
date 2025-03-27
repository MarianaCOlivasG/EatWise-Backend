import { DataSource, Connection } from "typeorm";
import {
    Customer,
    Seller,
    User,
} from "./entities";

interface Options {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
}

export class MySQLDatabase {
    static dataSource: DataSource;

    static async connect(options: Options): Promise<Connection> {
        this.dataSource = new DataSource({
            type: "mysql",
            host: options.host,
            port: options.port,
            username: options.username,
            password: options.password,
            database: options.database,
            synchronize: true,
            entities: [
                Customer,
                Seller,
                User,
            ],
            extra: {
                connectionLimit: 10,
            },
        });

        return this.initializeConnection();
    }

    private static async initializeConnection(): Promise<Connection> {
        const maxRetries = 5;
        let attempt = 0;

        while (attempt < maxRetries) {
            try {
                const connection = await this.dataSource.initialize();
                console.log('Database connected successfully' );
                return connection;
            } catch (error) {
                attempt++;
                console.error(`Error connecting to database (attempt ${attempt}):`, error);

                if (attempt < maxRetries) {
                    console.log("Retrying in 5 seconds...");
                    await this.delay(5000); // Wait before retrying
                } else {
                    throw new Error("Failed to connect to the database after multiple attempts");
                }
            }
        }

        // This should never be reached due to the error throwing above
        throw new Error("Unexpected error during database connection");
    }

    private static delay(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}
