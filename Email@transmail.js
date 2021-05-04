async function send_email (senders_email,receivers_email,receivers_name,mail_head,subject,email_body){
    var options = {
        "method": "POST",
        "hostname": "api.transmail.com",
        "port": null,
        "path": "/v1.1/email",
        "headers": {
          "accept": "application/json",
          "content-type": "application/json",
        //   mention auth credentials
          "authorization": `${api_credentials}`
        }
      };
      
      var req =await http.request(options, function (res) {
        var chunks = [];
      
        res.on("data", function (chunk) {
          chunks.push(chunk);
        });
      
        res.on("end", function () {
          var body = Buffer.concat(chunks);
          console.log(body.toString());
        });
      });
      
      await req.write(JSON.stringify({ 
        //   mention your bounce email
          bounce_address: `${email_bounce}`,
        from: { address: `${senders_email}`, name: `${mail_head}` },
        to: 
         [ { email_address: 
              { address: `${receivers_email}`,
                name: `${receivers_name}` } } ],
        subject: `${subject}`,
        htmlbody: `${email_body}` }));
      await req.end();
}

  
  module.exports=send_email;