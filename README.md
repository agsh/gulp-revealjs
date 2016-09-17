# gulp-revealjs
Way to make slides with gulp wrapper for reveal.js 

# Usage
``` js
const gulp = require('gulp')
	, pug = require('gulp-pug')
	, reveal = require('gulp-revealjs')
	;

gulp.task('slides', () => gulp.src('sources/*.pug')
	.pipe(pug({}))
	.pipe(reveal())
	.pipe(gulp.dest('slides/'))
);
```