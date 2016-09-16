const
	PLUGIN_NAME = 'revealjs'
	, through = require('through2')
	, gutil = require('gulp-util')
	, glob = require('glob')
	, vinylFile = require('vinyl-file')
	, vinylRead = require('vinyl-read')
	, path = require('path')
	;

function streamEnd(callback) {
	vinylRead(__dirname + '/reveal.js/**', {cwd: './'}).then(files => {
		files.forEach(file => {
			file.path = path.relative(__dirname, file.path);
			this.push(file);
		});
		callback();
	});
}

module.exports = (options = {}) => through.obj(function(file, encoding, callback) {
	if (file.isNull()) {
		// nothing to do
		return callback(null, file);
	}

	if (file.isStream()) {
		this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streams not supported!'));
	} else if (file.isBuffer()) {
		file.contents = Buffer('hello');
		return callback(null, file);
	}
}, streamEnd);