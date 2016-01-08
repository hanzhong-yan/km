var fs = require("fs");
module.export = KM = function KM(){
    return new KM();
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
    fs.appendFile(cfg.fileName,JSON.stringify(kp),function(err){
        if(err){
            self.body = err;
        }else{
            self.body = "save success. id:" + id;
        }
    });
};
