import type { FastifyReply, FastifyRequest } from 'fastify';

import { sendError } from '#lib/send-error.ts';

const { API_KEY, API_KEY_PUBLIC } = process.env;

async function checkAuthorization(
	{ headers, port, url }: FastifyRequest,
	reply: FastifyReply
) {
	if (
		port !== 4005 &&
		((url.includes('public/') &&
			headers.authorization !== `Bearer ${API_KEY_PUBLIC}`) ||
			(url.includes('private/') &&
				headers.authorization !== `Bearer ${API_KEY}`))
	) {
		return sendError('FORBIDDEN', reply, 'Access denied');
	}
}

export { checkAuthorization };
