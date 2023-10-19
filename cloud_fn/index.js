const { gcfSendGrid } = require("./vcloud_fn");

// Register a CloudEvent function with the Functions Framework
functions.cloudEvent('sendMail', cloudEvent => {
    let emailToSend = cloudEvent.data.email;
    response = gcfSendGrid.send(emailToSend);
    if(response=='success'){
        return true;
    } else {
        return false;
    }
  });