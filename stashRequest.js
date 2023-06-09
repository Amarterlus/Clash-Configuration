const headers = $request.headers;

headers.unshift('accept-language','ja-JP');

$done({headers});