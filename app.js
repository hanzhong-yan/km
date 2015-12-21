'use strict'
var koa = require("koa");
var app = koa();
var router = require("koa-router")();
var views = require('koa-views');


//logger 

app.use(function *(next){
    var start = new Date;
    yield next;
    var ms = new Date - start ; 
    console.log('%s %s - %s', this.method , this.url , ms);
});

//Must be used before any router is used 
app.use(views('views',{
    map : {
        html : 'ejs'
    }
}));


//response
app.use(function *(){
    // this.body = 'Hello World!';
    this.state = {
        session : this.session , 
        title : 'app'
    };
    yield this.render('user',{
        user : 'John'
    });
}); 

app.use(router.routes())
   .use(router.allowedMethods());

app.listen(3000);

router
    .get('/',function *(next){
        this.body = 'Hello World!';
    })
    .get('/users',function *(next){
        // this.body = ['hanzhong.yan'];
        this.render('user');
    })
    .get('/user',function *(){
        this.render('user',{user:'harry'});
    });



/* var cfg = {
    version : "1.1",
    name : '',
    createTime :'2015年 12月 19日 星期六 22:00:29 CST' 
};

console.log('fdasfdsal');
 */

