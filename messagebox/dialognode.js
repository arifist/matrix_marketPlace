var dialogNode = require("dialog-node"); 
const dialogNodeShow=(title,message,callback)=>{
//dialog-node.warn(msg, title, timeout, callback);
 dialogNode.warn(message,title,0,callback);
};

module.exports=dialogNodeShow;