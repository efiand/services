import type { HTTPMethods } from 'fastify';

const DEFAULT_SERVER_PORT = 3000;

type HttpMethodType = {
	DELETE: HTTPMethods;
	GET: HTTPMethods;
	PATCH: HTTPMethods;
	POST: HTTPMethods;
	PUT: HTTPMethods;
};

const HttpMethod: HttpMethodType = {
	DELETE: 'DELETE',
	GET: 'GET',
	PATCH: 'PATCH',
	POST: 'POST',
	PUT: 'PUT'
} as const;

export { DEFAULT_SERVER_PORT, HttpMethod, type HttpMethodType };
