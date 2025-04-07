import { checkAuthorization } from '#lib/check-authorization.ts';
import { DEFAULT_SERVER_PORT } from '#lib/constants.ts';
import cors from '@fastify/cors';
import staticPlugin from '@fastify/static';
import Fastify, { type RouteOptions } from 'fastify';
import path from 'node:path';

import { routes } from './routes/index.ts';

const { PORT = DEFAULT_SERVER_PORT } = process.env;

const app = Fastify();

await app.register(cors, {
	origin: '*'
});

app.register(staticPlugin, {
	root: path.join(process.cwd(), 'app/public')
});

app.addHook('onRequest', checkAuthorization);

routes.forEach(function (route) {
	app.route(route as RouteOptions);
});

try {
	await app.listen({
		port: Number(PORT)
	});
	console.info(`Server at http://localhost:${PORT}/info`);
} catch (error) {
	console.error(error);
}
