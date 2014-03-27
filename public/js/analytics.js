(function (exports, seismo) {
	var analytics = window.appConfig.analytics;

	var client = seismo(analytics.application, {
		server: analytics.url,
		credentials: {
			username: analytics.username,
			password: analytics.password,
		}
	});

	exports.ls.analytics = {
		track: function (event, data, callback) {
			if (typeof data === 'function') {
				callback = data;
				data = {};
			}

			data = data || {};

			client(event, data, function (err) {
				if (err) {
					console.error(err);
				}
				if (callback) {
					callback(err);
				}
			});
		}
	};

})(window, window.seismo);
