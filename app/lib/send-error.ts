import type { FastifyReply } from 'fastify';

import { ReasonPhrases, StatusCodes } from 'http-status-codes';

function sendBadRequest(reply: FastifyReply, message?: string) {
	return sendError('BAD_REQUEST', reply, message);
}

function sendError(
	code: keyof typeof StatusCodes,
	reply: FastifyReply,
	message: string = ReasonPhrases[code]
) {
	reply.status(StatusCodes[code]);

	return reply.send({
		error: ReasonPhrases[code],
		message,
		statusCode: StatusCodes[code]
	});
}

function sendNotFound(reply: FastifyReply, message?: string) {
	return sendError('NOT_FOUND', reply, message);
}

export { sendBadRequest, sendError, sendNotFound };
