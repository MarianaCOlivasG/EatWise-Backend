import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { CustomerRoutes } from "./customer/routes";
import { run } from './../services/openapi';
import { ChatCompletionMessageParam } from "openai/resources";


export class AppRoutes {

    static get routes(): Router {

        const router = Router();

        router.use('/api/auth', AuthRoutes.routes );
        router.use('/api/customer', CustomerRoutes.routes);
        router.post('/api/ia/recipes', async (req, res ) => {
            
            const { content, name } = req.body;
            const history: ChatCompletionMessageParam[] = [];

            history.push({
                role: 'user',
                content: content
            })

            const openaiResponse = await run( name, history );


            // history.push({
            //     role: 'assistant',
            //     content: openaiResponse
            // })

            history.push({
                role: 'assistant',
                content: JSON.parse(openaiResponse)
            })

            return res.json({
                ok: true,
                history
            })
        })

        return router;
    }


}