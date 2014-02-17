# rqst.js

The simpliest but yet powerful browser http request library.

## Install

## Usage

### rqst(options, callback)

The first argument can be either a url or an options object. The only required option is ``url`` others are optional.

List of available options:

- ``url`` - target url string
- ``method`` - http method (default: ``'GET'``)
- ``headers`` - http headers (default: ``{}``)
- ``body`` - entity body for ``POST``, ``PUT`` and ``PATCH`` requests, ``String`` is expected.

Last argument is a ``callback`` function, it takes three arguments: ``err, body, response``.

```javascript
var options = {
	url = 'https://api.github.com/repos/voronianski/rqst',
	headers: { 'User-Agent': 'rqst' }
};

function callback (err, response, body) {
	if (response.statusCode === 200) {
		console.log(body.stargazers_count + ' stars');
	}
}

rqst(options, callback);
```

## Restrictions

For now Rqst works **only** with ``Content-Type: application/json``.

## Methods

Shorthand methods for different HTTP methods:

### rqst.get

Same as ``rqst()``, but defaults to method: ``"GET"``.

```javascript
rqst.get(url, callback);
```

### rqst.post

Same as ``rqst()``, but defaults to method: ``"POST"``.

```javascript
rqst.post(url, opts, callback);
```

### rqst.put

Same as ``rqst()``, but defaults to method: ``"PUT"``.

```javascript
rqst.put(url, opts, callback);
```

### rqst.patch

Same as ``rqst()``, but defaults to method: ``"PATCH"``.

```javascript
rqst.patch(url, opts, callback);
```

### rqst.del

Same as ``rqst()``, but defaults to method: ``"DELETE"``.

```javascript
rqst.del(url, callback);
```

## Browsers supported

## Licence

MIT Licensed

Copyright (c) 2014, http://pixelhunter.me

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
