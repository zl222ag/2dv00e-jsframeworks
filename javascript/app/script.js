var ZAPP = {
	wrapper: 0,

	keyDown: function (e) {
		'use strict';
		if (e.keyCode !== 13) {
			return;
		}
		e.preventDefault();

		ZAPP.addTask(this.value);
		this.value = '';
	},

	addTask: function (a_taskText) {
		'use strict';
		var task = null, buttonRemove = null, buttonSuccess = null;

		if (typeof a_taskText !== 'string') {
			return;
		}
		a_taskText = a_taskText.trim();
		if (a_taskText.length < 1) {
			return;
		}
		a_taskText = a_taskText.replace(/\s{2,}/g, ' ');

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

		buttonRemove.addEventListener('click', ZAPP.remove, false);
		buttonSuccess.addEventListener('click', ZAPP.done, false);

		task.appendChild(buttonSuccess);
		task.appendChild(buttonRemove);

		task.appendChild(document.createElement('span'));
		task.lastElementChild.appendChild(document.createTextNode(a_taskText));
		ZAPP.wrapper.getElementsByTagName('ul')[0].appendChild(task);
	},

	remove: function () {
		'use strict';
		//TODO REMOVE FIREFOX FIX!
		var elem = this.parentElement;
		if (confirm('Do you want to remove todo with text: "' + elem.lastElementChild.firstChild.nodeValue + '".')) {
			elem.parentElement.removeChild(elem);
		}
	},

	done: function () {
		'use strict';
		this.parentElement.classList.toggle('alert-success');
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
