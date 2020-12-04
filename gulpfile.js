let gulp = require('gulp'); 
let scss = require('gulp-sass');
let csso = require('gulp-csso');
let rename = require('gulp-rename');

gulp.task('compile', function(){
    return gulp.src('scss/*.scss')
        //Komplierar scss-filen
        .pipe(scss())
        .pipe(gulp.dest('css'));
});

gulp.task('minify', function(){
    return gulp.src('scss/*.scss')
        //Komplierar scss-filen
        .pipe(scss())
        .pipe(gulp.dest('css'))
        //Minifiera min fil
        .pipe(csso())
        //Döper om min fil till main.min.scss 
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('css'));
});

/*Sitter och tittar på mina gulp-tasks*/ 
gulp.task('watch-scss', () => {
    /*Den ska kolla på alla filer och mappar inom mappen scss och sedan komplilera, minifiera och döpa om en fil 
    till en css-fil som heter main.min.css*/ 
    gulp.watch('scss/**/*.scss', (done) => {
        gulp.series(['compile', 'minify'])(done);
    });
});

gulp.task('default', gulp.series(['compile','minify']));


