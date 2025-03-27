

import express, { Express, Router } from 'express';
import path from 'path';
import http from 'http';
import { Sockets } from './sockets';
import { Server as WSServer } from 'socket.io';
import cors from 'cors';
import morgan from 'morgan';

interface Options {
    port?: number;
    host?: string;
    routes: Router
}

export class Server {

    public readonly app: Express = express();
    public readonly port: number;
    public readonly host: string;
    public readonly routes: Router;
    private readonly server = http.createServer(this.app);
    public readonly io = new WSServer(this.server)

    constructor(options: Options) {
        const { host = '127.0.0.1', port = 3500, routes } = options;
        this.host = host;
        this.port = port;
        this.routes = routes;
    }


    async start() {

        try {
            // Middleware
            this.app.use(express.json());
            this.app.use(express.urlencoded({ extended: true }));
            this.app.use(cors());

            this.app.use(morgan((tokens, req, res) => {
                return [
                  tokens.method(req, res),
                  tokens.url(req, res),
                  tokens.status(req, res),
                  tokens.res(req, res, 'content-length'), '-',
                  tokens['response-time'](req, res), 'ms'
                ].join(' ')
            }));

            this.app.set('io', this.io);
            // Inicializar sockets
            const sockets = new Sockets(this.io);
            sockets.handleEvents();

            Sockets.getInstance(this.io);

            // Endpoint de salud
            this.app.get('/health', (req, res) => {
                res.status(200).send('Healthy');
            });

            // Rutas
            this.app.use(this.routes);
            this.app.use(express.static(path.resolve(__dirname, './public')));

            // Manejo de errores
            this.app.use((err: any, _req: any, res: any, _next: any) => {
                console.error(err.stack);
                res.status(500).send('Something broke!');
            });

            this.server.listen(this.port, this.host, () => {
                console.log(`Server is running on HOST ${this.host} - PORT ${this.port}`);
            });
        } catch (error) {
            console.error("Failed to start the server:", error);
            process.exit(1);
        }
    }

}