import type { FastifyRequest } from 'fastify';

import { HttpMethod } from '#lib/constants.ts';

const infoRoute = {
	handler({ host, port }: FastifyRequest) {
		return {
			host,
			port
		};
	},
	method: HttpMethod.GET,
	url: '/info'
};

export { infoRoute };
