'use strict'

process.env.DEBUG = 'koaaa*,km';

var util = require("util");

var koa = require("koa");
var app = koa();
var router = require("koa-router")();
var views = require('koa-views');
var send = require('koa-send');

var logger = require('debug');
var debug= require('debug')('km');


var km = require('./km');

//logger 
app.use(function *(next){
    var start = new Date;
    yield next;
    var ms = new Date - start ; 
    debug('%s %s - %s', this.method , this.url , ms);
}); 

//Must be used before any router is used 
app.use(views('views',{
    map : {
        html : 'ejs'
    }
}));
 
app.use(function *(next){
    yield next;
});


    router.get('/',function *(next){
        debug("enter / ");
        yield this.render('user');
    }); 
    router.get('/account',function *(next){
        debug("enter /account ");
        yield this.render('user');
    }); 
    router.get('/user',function *(){
        debug("enter /user");
        yield this.render('user',{user:{name:'hanzhong.yan'}});
    });
    //the static resource
    router.get('/public/*',function *(){
        debug("get static resource :" + this.path);
        yield send(this,this.path);
    });


    router.post('/saveKnlg',function *(){
        console.log(this);
        km.saveKnowledge(this.kp);

    });

app.use(router.routes())
   .use(router.allowedMethods());
app.listen(3000);
