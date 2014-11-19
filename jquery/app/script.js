var ZAPP = {
	ENTER_KEY: 13,
	ESCAPE_KEY: 27,
	REGEX_WHITESPACE: /\s{2,}/g,

	wrapper: null,

	keyDown: function (e) {
		'use strict';
		var elem = null;

		if (e.keyCode === ZAPP.ESCAPE_KEY) {
			$('.alert-warning').removeClass('alert-warning');
			return;
		}
		if (e.keyCode !== ZAPP.ENTER_KEY) {
			return;
		}
		e.preventDefault();

		elem = $(this);
		ZAPP.addTask(elem.val());
		elem.val('');
	},

	addTask: function (a_taskText) {
		'use strict';
		var task = null, editing = null;
		if (typeof a_taskText !== 'string') {
			return;
		}
		a_taskText = $.trim(a_taskText);
		if (a_taskText.length < 1) {
			return;
		}
		a_taskText = a_taskText.replace(ZAPP.REGEX_WHITESPACE, ' ');

		editing = $('.alert-warning');

		if (editing.length < 1) {
			task = $('<li class="alert"><button type="button" class="btn btn-success btn-xs"><span class="glyphicon glyphicon-ok" /></button> <button type="button" class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-remove" /></button> <button type="button" class="btn btn-warning btn-xs"><span class="glyphicon glyphicon-edit" /></button> <span /></li>');
			task.children().last().text(a_taskText);
			task.children('.btn-danger').click(ZAPP.remove);
			task.children('.btn-success').click(ZAPP.done);
			task.children('.btn-warning').click(ZAPP.edit);
			ZAPP.wrapper.children('ul').append(task);
		} else {
			editing.removeClass('alert-warning').children('span').text(a_taskText);
		}
	},

	remove: function (e) {
		'use strict';
		var elem = $(e.currentTarget).parent();
		if (confirm('Do you want to remove todo with text: "' + elem.children().last().text() + '".')) {
			elem.remove();
		}
		$('textarea').focus();
	},

	done: function (e) {
		'use strict';
		$(e.currentTarget).parent().toggleClass('alert-success');
		$('textarea').focus();
	},

	edit: function (e) {
		'use strict';
		$('.alert-warning').removeClass('alert-warning');
		ZAPP.wrapper.children('textarea').focus().val($(e.currentTarget).parent().addClass('alert-warning').children('span').text());
	}
};

$(document).ready(function () {
	'use strict';
	ZAPP.wrapper = $('<div class="container"><h1 /><ul /><textarea cols="60" rows="3" /></div>');
	ZAPP.wrapper.children('h1').text($(document).attr('title'));
	ZAPP.wrapper.children('textarea').keydown(ZAPP.keyDown);
	$(document.body).append(ZAPP.wrapper);
}, false);
