var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

//gulp.task('lint', function () {
//	gulp.src('./**/*.js')
//		.pipe($.jshint())
//});

gulp.task('develop', function () {
	$.nodemon({
		script: 'server.js',
		ext: 'html js json'
	})
//	.on('change', ['lint'])
	.on('restart', function () {
		console.log('restarted!')
	})
});
