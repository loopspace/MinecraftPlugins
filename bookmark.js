var utils = require('utils');

var _store = { bookmarks: {}};
var _help = function() {
	return [
		'/jsp bookmark {bookmark} : bookmark current location as {bookmark}',
		'/jsp bookmark save {bookmark} : bookmark current location as {bookmark} providing {bookmark} does not exist',
		'/jsp bookmark forcesave {bookmark} : bookmark current location as {bookmark}',
		'/jsp bookmark update {bookmark} : update {bookmark} to current location',
		'/jsp bookmark to {bookmark} : teleport to {bookmark}',
    '/jsp bookmark todeath : teleport to last death location',
		'/jsp bookmark list : list all bookmarks',
		'/jsp bookmark : list all bookmarks',
		'/jsp bookmark help : display bookmark help'
	];
}

var _to = function(bk,me) {
	if (typeof bk == 'undefined') {
		echo(me, 'No bookmark specified');
		return;
	}
	var loc = _store.bookmarks[bk];
	if (typeof loc == 'undefined') {
		echo(me, 'No bookmark named ' + bk);
		return;
	}
	var tloc = utils.locationFromJSON(loc);
	me.teleportTo(tloc);
}

var _save = function(bk,me) {
	if (typeof bk == 'undefined') {
		echo(me, 'You must specify a bookmark');
		return;
	}
	var loc = _store.bookmarks[bk];
	if (typeof loc != 'undefined') {
		echo(me, 'Bookmark ' + bk + ' already defined');
		return;
	}
	_store.bookmarks[bk] = utils.locationToJSON(me.location);
  echo(me, 'Bookmark ' + bk + ' saved');
}

var _update = function(bk,me) {
	if (typeof bk == 'undefined') {
		echo(me, 'You must specify a bookmark');
		return;
	}
	var loc = _store.bookmarks[bk];
	if (typeof loc == 'undefined') {
		echo(me, 'Bookmark ' + bk + ' not yet defined, use "save" instead');
		return;
	}
	_store.bookmarks[bk] = utils.locationToJSON(me.location);
  echo(me, 'Bookmark ' + bk + ' updated');
}

var _forcesave = function(bk,me) {
	if (typeof bk == 'undefined') {
		echo(me, 'You must specify a bookmark');
		return;
	}
	_store.bookmarks[bk] = utils.locationToJSON(me.location);
  echo(me, 'Bookmark ' + bk + ' saved');
}

var _death = function(e) {
	var bk = e.player.name + 'Died';
	_store.bookmarks[bk] = utils.locationToJSON(e.player.location);
  echo(e.player, 'Death position saved as ' + bk);
}

var _todeath = function(me) {
	var bk = me.name + 'Died';
	var loc = _store.bookmarks[bk];
	if (typeof loc == 'undefined') {
		echo(me, 'No death location for ' + me.name);
		return;
	}
	var tloc = utils.locationFromJSON(loc);
	me.teleportTo(tloc);
}

events.playerDeath(_death);

var _delete = function(bk,me) {
	if (typeof bk == 'undefined') {
		echo(me, 'You must specify a bookmark');
		return;
	}
	var loc = _store.bookmarks[bk];
	if (typeof loc == 'undefined') {
		echo(me, 'Bookmark ' + bk + ' not defined');
		return;
	}
	delete _store.bookmarks[bk];
  echo(me, 'Bookmark ' + bk + ' deleted');
}

var _list = function() {
	var result = [];
	for (var bk in _store.bookmarks) {
		result.push(bk);
	}
	return result;
}

var bookmarks = plugin('bookmarks', {
	store: _store,
	help: _help,
	save: _save,
	list: _list,
	to: _to,
	update: _update,
	forcesave: _forcesave,
	todeath: _todeath,
	delete: _delete
}, true);

var options = {
	'save': function(bk, sender) {
		bookmarks.save(bk,sender);
	},
	'forcesave': function(bk, sender) {
		bookmarks.forcesave(bk,sender);
	},
	'update': function(bk, sender) {
		bookmarks.update(bk,sender);
	},
	'todeath': function(bk,sender) {
		bookmarks.todeath(sender);
	},
	'list': function(params,sender) {
		var bks = bookmarks.list();
		if (bks.length == 0) {
			echo(sender, 'No bookmarks listed');
			return;
		} else {
			echo(sender, [
				'Current bookmarks are: ' + bks.join(', ')
			]);
		}
	},
	'to': function(bk,sender) {
		bookmarks.to(bk,sender);
	},
	'help': function(params,sender) {
		echo(sender,bookmarks.help());
	},
	'delete': function(bk,sender) {
		bookmarks.delete(bk,sender);
	}
};

var optionList = [];
for (var o in options) {
	optionList.push(o);
};

command('bookmark', function(params, sender) {
	var option;
	if (params.length == 0) {
		option=options['list'];
	} else {
		option = options[params[0]];
	}
	if (option) {
		option(params[1],sender);
	} else {
		bookmarks.save(params[0],sender);
	}
}, optionList)

