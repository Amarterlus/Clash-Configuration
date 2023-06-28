const headers = $request.headers;

Object.assign(headers, { 'accept-language': 'ja-JP' });

$done({ headers });