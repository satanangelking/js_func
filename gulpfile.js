
const gulp = require('gulp')
const rename = require('gulp-rename')

const path={
    html:{
        src:'html/**/*.html',
        develop:'dist/develop/html',
        online:'dist/online/html'
    },
    sass:{
        src:'html/**/*.scss',
        develop:'dist/develop/css',
        online:'dist/online/css'
    },
    css:{
        src:'html/**/*.css',
        develop:'dist/develop/css',
        online:'dist/online/css'
    },
    js:{
        src:'html/**/*.js',
        develop:'dist/develop/js',
        online:'dist/online/js'
    },
    img:{
        src:'html/**/*.{jpg,png,jpeg}',
        develop:'dist/develop/img',
        online:'dist/online/img'
    }
}


const htmlmin = require('gulp-htmlmin')
gulp.task('html',function (){
    return gulp.src(path.html.src)
        .pipe(gulp.dest(path.html.develop))
        .pipe(htmlmin({
            removeComments:true,
            collapseWhitespace:true,
            collapseBooleanAttributes:true,
            removeEmptyAttributes:true,
            removeScriptTypeAttributes:false,
            removeStyleLinkTypeAttributes:true,
            minifyJS:true,
            minifyCss:true
        }))
        .pipe(rename({
            suffix:'.min',
            extname:'.html'
        }))
        .pipe(gulp.dest(path.html.online))
        .pipe(connect.reload())
})

const babel = require('gulp-babel')
const uglify =require('gulp-uglify')
gulp.task('js',function (){
    return gulp.src(path.js.src)
        .pipe(babel())
        .pipe(gulp.dest(path.js.develop))
        .pipe(uglify())
        .pipe(rename({
            suffix:'.min',
            extname:'.js'
        }))
        .pipe(gulp.dest(path.js.online))
        .pipe(connect.reload())
})

const css =require('gulp-clean-css')
const sass =require('gulp-sass')
gulp.task('css',function (){
    return gulp.src(path.css.src)
        .pipe(gulp.dest(path.css.develop))
        .pipe(css())
        .pipe(rename({
            suffix:'.min',
            extname:'.css'
        }))
        .pipe(gulp.dest(path.css.online))
        .pipe(connect.reload())
})
gulp.task('sass',function (){
    return gulp.src(path.sass.src)
        .pipe(sass())
        .pipe(gulp.dest(path.sass.develop))
        .pipe(css({compatibility:'ie8'}))
        .pipe(rename({
            suffix:'.min',
            extname:'.css'
        }))
        .pipe(gulp.dest(path.sass.online))
        .pipe(connect.reload())
})

gulp.task('img',function (){
    return gulp.src(path.img.src)
        .pipe(gulp.dest(path.img.develop))
        .pipe(gulp.dest(path.img.online))
})

gulp.task('build',gulp.series(['html','css','js','sass','img']),function (){
    console.log('完成')
})

const series =gulp.series
gulp.task('watch',function (){
    gulp.watch(path.html.src,series('html'))
    gulp.watch(path.css.src,series('css'))
    gulp.watch(path.sass.src,series('sass'))
    gulp.watch(path.js.src,series('js'))
})

const connect = require('gulp-connect')
gulp.task('server',function (){
    connect.server({
        root:'dist',
        port:'8888',
        livereload:true
    })
})


gulp.task('default',series(gulp.parallel('build','watch','server')))

// const connect = require('gulp-connect')
// gulp.task('copy-html',function (){
//     return gulp.src('html/**/*.html')
//         .pipe(gulp.dest('dist/html'))
//         .pipe(connect.reload())
// })
//
// gulp.task('copy-css',function (){
//     return gulp.src('html/**/*.css')
//         .pipe(gulp.dest('dist/css'))
//         .pipe(connect.reload())
//
// })
//
// gulp.task('copy-js',function (){
//     return gulp.src('html/**/*.js')
//         .pipe(gulp.dest('dist/js'))
//         .pipe(connect.reload())
// })
//
// gulp.task('build',gulp.series(['copy-html','copy-css','copy-js'],function (done){
//     console.log('完成')
//     done()
// }))
//
//
// gulp.task('server',function (){
//     connect.server({
//         root:'dist',
//         port:8888,
//         livereload:true
//     })
// })
//
//
// let htmlTask = gulp.series('copy-html')
// let cssTask = gulp.series('copy-css')
// let jsTask = gulp.series('copy-js')
// gulp.task('watch',function (){
//     gulp.watch('html/**/*.html',htmlTask)
//     gulp.watch('html/**/*.css',cssTask)
//     gulp.watch('html/**/*/js',jsTask)
// })
//
// gulp.task('default',gulp.series(['build','watch','server']),function (){
//     console.log('服务器启动')
// })