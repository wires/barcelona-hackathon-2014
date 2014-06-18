var gulp = require('gulp');
var $ = require('gulp-load-plugins')();


var build_dir = 'www/build/'

var javascripts = [
	'bower_components/angular/angular.js',
	'bower_components/angular-route/angular-route.js',
	'www/js/app.js',
	'www/js/controllers.js'
]

// process our stylesheet
gulp.task('sass', function(){
	return gulp.src('sass/application.scss')
		.pipe($.rubySass())
		.pipe(gulp.dest(build_dir + 'application.css'));
})

gulp.task('javascript', function(){
	return gulp.src(javascripts)
		.pipe($.concat())
		.pipe(gulp.dest(build_dir + 'application.js'));
})

gulp.task('develop', function () {
	$.nodemon({
		script: 'server.js',
		ext: 'html js json'
	})
	.on('change', ['sass', 'javascript'])
	.on('restart', function () {
		console.log('restarted!')
	})
});

gulp.task('default', ['sass', 'javascript', 'develop']);
