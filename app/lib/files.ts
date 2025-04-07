import type { WithImplicitCoercion } from 'node:buffer';

import webp from '@cwasm/webp';
import jpeg from 'jpeg-js';
import mime from 'mime/lite';

async function getBufferFromUrl(rawUrl = '', rawQuality: number | string = 0) {
	const url = decodeURIComponent(rawUrl);
	const quality = Number(rawQuality || 0);
	let contentType = mime.getType(url) || '';
	let file: ArrayBuffer | Buffer = await fetch(url).then((response) =>
		response.arrayBuffer()
	);

	if (quality && contentType === 'image/webp') {
		contentType = 'image/jpeg';
		file = jpeg.encode(webp.decode(new Uint8Array(file)), quality).data;
	}

	return {
		buffer: Buffer.from(file as WithImplicitCoercion<ArrayLike<number>>),
		contentLength: file.byteLength,
		contentType
	};
}

export { getBufferFromUrl };
