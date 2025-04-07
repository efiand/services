import type { FastifyReply, FastifyRequest } from 'fastify';

import { HttpMethod } from '#lib/constants.ts';
import { getBufferFromUrl } from '#lib/files.ts';
import { sendBadRequest, sendNotFound } from '#lib/send-error.ts';
// @ts-expect-error No types
import HTMLtoDOCX from '@turbodocx/html-to-docx/dist/html-to-docx.esm.js';
import * as cheerio from 'cheerio';
import mime from 'mime/lite';

type DocxRequest = FastifyRequest & {
	body: {
		footerHTMLString?: string;
		headerHTMLString?: string;
		html?: string;
		options?: object;
		webpQuality?: number;
	};
};

const docxRoute = {
	async handler(
		{
			body: {
				footerHTMLString = '<p></p>',
				headerHTMLString = '<p></p>',
				html = '',
				options = {},
				webpQuality = 70
			}
		}: DocxRequest,
		reply: FastifyReply
	) {
		if (!html) {
			return sendBadRequest(reply, 'HTML отсутствует.');
		}

		const $ = cheerio.load(html);

		try {
			const promises: Promise<void>[] = [];
			$('img').each(function (_i, element) {
				const $element = $(element);
				const src = $element.attr('src') || '';
				if (src.includes('.webp')) {
					promises.push(
						(async function () {
							const { buffer, contentType } = await getBufferFromUrl(
								src,
								webpQuality
							);
							$element.attr(
								'src',
								`data:${contentType};base64,${buffer.toString('base64')}`
							);
						})()
					);
				}
			});
			await Promise.all(promises);

			const fileBuffer = await HTMLtoDOCX(
				$.html(),
				headerHTMLString,
				options,
				footerHTMLString
			);

			reply.header('Cache-Control', 'public, max-age=6048000');
			reply.header('Content-Length', fileBuffer.byteLength.toString());
			reply.header('Content-Type', mime.getType('docx'));

			return fileBuffer;
		} catch (error) {
			sendNotFound(reply, `${(error as Error)?.message || error}`);
		}
	},
	method: HttpMethod.POST,
	url: '/public/docx'
};

export { docxRoute };
