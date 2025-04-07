import type { FastifyReply, FastifyRequest } from 'fastify';

import { HttpMethod } from '#lib/constants.ts';

const mainRoute = {
	handler(_request: FastifyRequest, reply: FastifyReply) {
		reply.redirect('https://efiand.ru');
	},
	method: HttpMethod.GET,
	url: '/'
};

export { mainRoute };
