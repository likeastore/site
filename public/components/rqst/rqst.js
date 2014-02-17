/*
 * Rqst.js - the simpliest (but yet powerful) client side http request lib
 * https://github.com/voronianski/rqst
 * (c) 2014 MIT Licensed, http://pixelhunter.me
 */

(function (root, factory) {

	if (typeof define === 'function' && define.amd) {
		define([], factory);
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		root.rqst = factory();
	}

}(this, function () {
	var xhr = new XMLHttpRequest();

	if (!xhr) {
		throw new Error('Browser doesn\'t support XMLHttpRequest');
	}

	var rqst = function (options, callback) {
		if (!options) {
			throw new Error('Options are required');
		}

		if (typeof callback !== 'function') {
			throw new Error('Callback is required');
		}

		if (typeof options === 'string') {
			options = { url: options };
		}

		options.method = options.method || 'GET';
		options.headers = options.headers || {};
		options.body = options.body || null;

		xhr.open(options.method, options.url, true);

		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				try {
					xhr.body = JSON.parse(xhr.responseText);
				} catch (err) {
					return callback(err);
				}

				xhr.statusCode = xhr.status;

				callback(null, xhr, xhr.body);
			}
		};

		if (options.method === 'POST' || options.method === 'PUT' || options.method === 'PATCH') {
			options.body = JSON.stringify(options.body);
			xhr.setRequestHeader('Content-Type', 'application/json');
		}

		xhr.send(options.body);
	};

	rqst.get = function (opts, callback) {
		shortcut('GET', opts, callback);
	};

	rqst.post = function (opts, callback) {
		shortcut('POST', opts, callback);
	};

	rqst.put = function (opts, callback) {
		shortcut('PUT', opts, callback);
	};

	rqst.patch = function (opts, callback) {
		shortcut('PATCH', opts, callback);
	};

	rqst.del = function (opts, callback) {
		shortcut('DELETE', opts, callback);
	};

	function shortcut(method, opts, callback) {
		return function () {
			if (typeof opts === 'string') {
				opts = { method: method, url: opts };
			} else {
				opts.method = method;
			}

			rqst(opts, callback);
		}();
	}


	return rqst;

}));
