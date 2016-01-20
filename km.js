var fs = require("fs");
module.exports = KM ; 
function KM(){
    if (!(this instanceof KM)) {
      return new KM();
    }
    this.data = {};
};

var cfg = {
    fileName : "data/storage.km"
};

/**
 *
 *保存知识
 *
 **/
KM.prototype.saveKnowledge = function(kp){
    var id = (new Date()).getTime();
    kp.id = id;
    var self = this;
    return new Promise(function(resolve,reject){
        fs.appendFile(cfg.fileName,JSON.stringify(kp)+'\n',function(err){
            if(err){
                reject(err);
            }else{
                resolve(kp);
            }
        });
    });
};
