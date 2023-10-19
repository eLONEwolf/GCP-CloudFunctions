exports.gcfSendGrid = (data,context) =>{
    const sendGridMail = require('@sendgrid/mail'); // permission
    sendGridMail.setApiKey(""); // 
    const msg = {
        to: '',
        from: '',
        subject: '',
        text: '',
        html: '',
    };
    sendGridMail.send(msg);
}


exports.gcfSendGrid = (data, context) => {
    const sendGridMail = require('@sendgrid/mail');
    sendGridMail.setApiKey("");
    const msg = {
      to: 'TOADDRESS@gmail.com',
      from: 'FROMADDRESS@gmail.com',
      subject: '',
      html: ''      
    };
    sendGridMail.send(msg)
  };

  const functions = require('@google-cloud/functions-framework');

  