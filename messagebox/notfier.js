const notifier = require('node-notifier');
const path = require('path');

const notifier_show=(title,message,callback)=>{
    notifier.notify(
        { title: title,
          message: message,
          icon: path.join(__dirname, 'coulson.jpg'), // Absolute path (doesn't work on balloons)
          sound: true, // Only Notification Center or Windows Toasters
          wait: true // Wait with callback, until user action is taken against notification, does not apply to Windows Toasters as they always wait or notify-send as it does not support the wait option
        },
        callback
      );
};

module.exports=notifier_show;