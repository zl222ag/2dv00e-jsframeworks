var ZAPP = {
	wrapper: null,
	REGEX_WHITESPACE: /\s{2,}/g,

	keyDown: function (e) {
		'use strict';
		var elem = null;
		if (e.keyCode !== 13) {
			return;
		}
		e.preventDefault();

		elem = $(this);
		ZAPP.addTask(elem.val());
		elem.val('');
	},

	addTask: function (a_taskText) {
		'use strict';
		if (typeof a_taskText !== 'string') {
			return;
		}
		a_taskText = $.trim(a_taskText);
		if (a_taskText.length < 1) {
			return;
		}
		a_taskText = a_taskText.replace(ZAPP.REGEX_WHITESPACE, ' ');

		var task = $('<li class="alert"><button type="button" class="btn btn-success btn-xs"><span class="glyphicon glyphicon-ok" /></button> <button type="button" class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-remove" /></button> <span /></li>');
		task.children().last().text(a_taskText);
		task.children('.btn-danger').click(ZAPP.remove);
		task.children('.btn-success').click(ZAPP.done);
		ZAPP.wrapper.children('ul').append(task);
	},

	remove: function (e) {
		'use strict';
		var elem = $(e.currentTarget).parent();
		if (confirm('Do you want to remove todo with text: "' + elem.children().last().text() + '".')) {
			elem.remove();
		}
	},

	done: function (e) {
		'use strict';
		$(e.currentTarget).parent().toggleClass('alert-success');
	}
};

$(document).ready(function () {
	'use strict';
	ZAPP.wrapper = $('<div class="container"><h1 /><ul /><textarea cols="60" rows="3" /></div>');
	ZAPP.wrapper.children('h1').text($(document).attr('title'));
	ZAPP.wrapper.children('textarea').keydown(ZAPP.keyDown);
	$(document.body).append(ZAPP.wrapper);
}, false);
