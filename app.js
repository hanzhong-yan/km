'use strict'

process.env.DEBUG = 'koaaa*,km';

var util = require("util");

var koa = require("koa");
var app = koa();
var router = require("koa-router")();
var views = require('koa-views');
var send = require('koa-send');
var parse = require('co-body');

var logger = require('debug');
var debug= require('debug')('km');


var km = require('./km')();
debug('km is : %j' , km);

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
        try{
            // throw(Error('test error ....'));
            var knlg = yield parse(this);
            console.log(knlg);
            //km.saveKnowledge.call(this,{kp:'this is test'});
            this.body = yield km.saveKnowledge.call(this,knlg);
        }catch(e){
            console.error('-------------',e);
        }
    });

app.use(router.routes())
   .use(router.allowedMethods());
app.listen(3000);
app.on('error',function(err,ctx){
    log.error("server meet error:",err,ctx);
    ctx.body = err ; 
});




