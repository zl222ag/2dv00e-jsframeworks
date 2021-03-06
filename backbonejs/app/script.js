var TodoView = Backbone.View.extend({
	ENTER_KEY: 13,
	ESCAPE_KEY: 27,
	REGEX_WHITESPACE: /\s{2,}/g,
	LIST_TEMPLATE: _.template('<li class="alert"><button type="button" class="btn btn-success btn-xs"><span class="glyphicon glyphicon-ok" /></button> <button type="button" class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-remove" /></button> <button type="button" class="btn btn-warning btn-xs"><span class="glyphicon glyphicon-edit" /></button> <span><%- text %></span></li>'),

	wrapper: null,
	el: 'body',

	keyDown: function (e) {
		'use strict';
		var elem = null;

		if (e.keyCode === this.ESCAPE_KEY) {
			$('.alert-warning').removeClass('alert-warning');
			return;
		}
		if (e.keyCode !== this.ENTER_KEY) {
			return;
		}
		e.preventDefault();

		elem = $(e.target);
		this.addTask(elem.val());
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
		a_taskText = a_taskText.replace(this.REGEX_WHITESPACE, ' ');

		editing = $('.alert-warning');

		if (editing.length < 1) {
			task = this.LIST_TEMPLATE({text: a_taskText});
			this.wrapper.children('ul').append(task);
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
		this.wrapper.children('textarea').focus().val($(e.currentTarget).parent().addClass('alert-warning').children('span').text());
	},

	events: {
		'keydown textarea': 'keyDown',
		'click .btn-danger': 'remove',
		'click .btn-warning': 'edit',
		'click .btn-success': 'done'
	},

	initialize: function () {
		'use strict';
	},

	render: function () {
		'use strict';
		this.wrapper = $(_.template('<div class="container"><h1><%- title %></h1><ul /><textarea cols="60" rows="3" /></div>')({title: $(document).attr('title')}));
		this.$el.append(this.wrapper);
		return this;
	}
});

$(document).ready(function () {
	'use strict';
	var todoView = new TodoView();
	todoView.render();
}, false);
