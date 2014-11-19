var ZAPP = {
	ENTER_KEY: 13,
	ESCAPE_KEY: 27,
	REGEX_WHITESPACE: /\s{2,}/g,

	wrapper: null,

	keyDown: function (e) {
		'use strict';
		if (e.keyCode === ZAPP.ESCAPE_KEY) {
			var editing = document.getElementsByClassName('alert-warning'), i = 0, len = 0;
			for (i = 0; len < editing.length; ++i) {
				editing[i].classList.remove('alert-warning');
			}
			return;
		}
		if (e.keyCode !== ZAPP.ENTER_KEY) {
			return;
		}
		e.preventDefault();

		ZAPP.addTask(this.value);
		this.value = '';
	},

	addTask: function (a_taskText) {
		'use strict';
		var task = null, buttonRemove = null, buttonSuccess = null, buttonEdit = null, editing = null, i = 0, len = 0;

		if (typeof a_taskText !== 'string') {
			return;
		}
		a_taskText = a_taskText.trim();
		if (a_taskText.length < 1) {
			return;
		}
		a_taskText = a_taskText.replace(ZAPP.REGEX_WHITESPACE, ' ');

		editing = document.getElementsByClassName('alert-warning');

		if (editing.length < 1) {
			task = document.createElement('li');
			task.className = 'alert';

			buttonRemove = document.createElement('button');
			buttonRemove.className = 'btn btn-danger btn-xs';
			buttonRemove.appendChild(document.createElement('span'));
			buttonRemove.firstElementChild.className = 'glyphicon glyphicon-remove';
			buttonRemove.type = 'button';

			buttonSuccess = document.createElement('button');
			buttonSuccess.className = 'btn btn-success btn-xs';
			buttonSuccess.appendChild(document.createElement('span'));
			buttonSuccess.firstElementChild.className = 'glyphicon glyphicon-ok';
			buttonSuccess.type = 'button';

			buttonEdit = document.createElement('button');
			buttonEdit.className = 'btn btn-warning btn-xs';
			buttonEdit.appendChild(document.createElement('span'));
			buttonEdit.firstElementChild.className = 'glyphicon glyphicon-edit';
			buttonEdit.type = 'button';

			buttonRemove.addEventListener('click', ZAPP.remove, false);
			buttonSuccess.addEventListener('click', ZAPP.done, false);
			buttonEdit.addEventListener('click', ZAPP.edit, false);

			task.appendChild(buttonSuccess);
			task.appendChild(document.createTextNode(' '));
			task.appendChild(buttonRemove);
			task.appendChild(document.createTextNode(' '));
			task.appendChild(buttonEdit);
			task.appendChild(document.createTextNode(' '));

			task.appendChild(document.createElement('span'));
			task.lastElementChild.appendChild(document.createTextNode(a_taskText));
			ZAPP.wrapper.getElementsByTagName('ul')[0].appendChild(task);
		} else {
			editing[0].lastElementChild.firstChild.nodeValue = a_taskText;
			for (i = 0; len < editing.length; ++i) {
				editing[i].classList.remove('alert-warning');
			}
		}
	},

	remove: function (e) {
		'use strict';
		var elem = e.currentTarget.parentElement;
		if (confirm('Do you want to remove todo with text: "' + elem.lastElementChild.firstChild.nodeValue + '".')) {
			elem.parentElement.removeChild(elem);
		}
		ZAPP.wrapper.getElementsByTagName('textarea')[0].focus();
	},

	done: function (e) {
		'use strict';
		e.currentTarget.parentElement.classList.toggle('alert-success');
		ZAPP.wrapper.getElementsByTagName('textarea')[0].focus();
	},

	edit: function (e) {
		'use strict';
		var editing = document.getElementsByClassName('alert-warning'), i = 0, len = 0, textarea = null, elem = null;
		for (i = 0; len < editing.length; ++i) {
			editing[i].classList.remove('alert-warning');
		}
		textarea = ZAPP.wrapper.getElementsByTagName('textarea')[0];
		textarea.focus();
		elem = e.currentTarget.parentElement;
		elem.classList.add('alert-warning');
		textarea.value = elem.lastElementChild.firstChild.nodeValue;
		textarea.focus();
	}
};

window.addEventListener('load', function () {
	'use strict';
	var h1 = null, textarea = null;

	ZAPP.wrapper = document.createElement('div');
	ZAPP.wrapper.className = 'container';

	h1 = document.createElement('h1');
	h1.appendChild(document.createTextNode(document.title));
	ZAPP.wrapper.appendChild(h1);

	ZAPP.wrapper.appendChild(document.createElement('ul'));

	textarea = document.createElement('textarea');
	textarea.cols = '60';
	textarea.rows = '3';
	textarea.addEventListener('keydown', ZAPP.keyDown, false);
	ZAPP.wrapper.appendChild(textarea);
	document.body.appendChild(ZAPP.wrapper);
}, false);
