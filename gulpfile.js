var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

// process our stylesheet
gulp.task('sass', function(){
	return gulp.src('sass/application.scss')
		.pipe($.rubySass())
		.pipe(gulp.dest('www/css/style.css'));
});

gulp.task('develop', function () {
	$.nodemon({
		script: 'server.js',
		ext: 'html js json'
	})
	.on('change', ['sass'])
	.on('restart', function () {
		console.log('restarted!')
	})
});
