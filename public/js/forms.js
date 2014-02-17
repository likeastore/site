(function (exports, undefined) {
	'use strict';

	Vue.config('debug', true);

	exports.form = new Vue({
		el: '#join',

		data: {
			email: 's',
			password: 'ss'
		},

		methods: {
			submitForm: function (event) {
				event.preventDefault();
				debugger;
			}
		}
	});

})(window);
