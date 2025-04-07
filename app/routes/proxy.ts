import type { FastifyReply, FastifyRequest } from 'fastify';

import { HttpMethod } from '#lib/constants.ts';
import { getBufferFromUrl } from '#lib/files.ts';
import { sendNotFound } from '#lib/send-error.ts';

type ProxyQuery = {
	quality?: string;
	url?: string;
};

const proxyRoute = {
	async handler(
		{ query = {} }: FastifyRequest<{ Querystring: ProxyQuery }>,
		reply: FastifyReply
	) {
		try {
			const { buffer, contentLength, contentType } = await getBufferFromUrl(
				query.url,
				query.quality
			);

			reply.header('Cache-Control', 'public, max-age=6048000');
			reply.header('Content-Length', contentLength.toString());
			reply.header('Content-Type', contentType);

			return buffer;
		} catch {
			sendNotFound(reply, 'Файл не найден.');
		}
	},
	method: HttpMethod.GET,
	url: '/public/proxy'
};

export { proxyRoute };
