var ZAPP = {
	wrapper: 0,

	keyDown: function (e) {
		'use strict';
		var elem = null;
		if (e.keyCode !== 13) {
			return;
		}

		elem = $(this);
		ZAPP.addTask(elem.val());
		elem.val('');
		return false;
	},

	addTask: function (a_taskText) {
		'use strict';
		if (typeof a_taskText !== 'string') {
			return;
		}
		a_taskText = a_taskText.trim();
		if (a_taskText.length < 1) {
			return;
		}
		a_taskText = a_taskText.replace(/\s{2,}/g, ' ');

		var task = $('<li class="alert"><button type="button" class="btn btn-success btn-xs"><span class="glyphicon glyphicon-ok" /></button> <button type="button" class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-remove" /></button> </li>');
		task.children('.btn-danger').click(ZAPP.remove);
		task.children('.btn-success').click(ZAPP.done);
		task.append($('<span />').text(a_taskText));
		ZAPP.wrapper.children('ul').append(task);
	},

	remove: function () {
		'use strict';
		var elem = $(this).parent();
		if (confirm('Do you want to remove todo with text: "' + elem.children('span').text() + '".')) {
			elem.remove();
		}
	},

	done: function () {
		'use strict';
		$(this).parent().toggleClass('alert-success');
	}
};

$(document).ready(function () {
	'use strict';
	ZAPP.wrapper = $('<div class="container" />');
	ZAPP.wrapper.append($('<h1 />').text($(document).attr('title')));
	ZAPP.wrapper.append($('<ul />'));
	ZAPP.wrapper.append($('<textarea cols="60" rows="3" />').keydown(ZAPP.keyDown));
	$(document.body).append(ZAPP.wrapper);
}, false);
