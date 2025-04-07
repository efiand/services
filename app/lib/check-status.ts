function checkStatus(response: Response) {
	if (!response.ok) {
		throw new Error(`HTTP ${response.status} - ${response.statusText}`);
	}
	return response;
}

export { checkStatus };
