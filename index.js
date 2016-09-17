const
	PLUGIN_NAME = 'revealjs'
	, through = require('through2')
	, gutil = require('gulp-util')
	, vinylRead = require('vinyl-read')
	, path = require('path')
	, fs = require('fs')
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

module.exports = (options = {
	revealPath: 'reveal.js/'
}) => {
	const template = gutil.template(fs.readFileSync(__dirname + '/template.html').toString());

	return through.obj(function(file, encoding, callback) {
		if (file.isNull()) {
			// nothing to do
			return callback(null, file);
		}

		if (file.isStream()) {
			this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streams not supported!'));
		} else if (file.isBuffer()) {
			file.contents = Buffer(
				template({
					contents: file.contents.toString()
					, revealPath: options.revealPath
					, file: null
				})
			);
			return callback(null, file);
		}
	}, streamEnd);
};