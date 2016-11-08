'use strict';

var nodemailer = require('nodemailer');

exports.contact = function(req, res) {
    var message = "<p>Message envoyé part " + req.body.name + " (" + req.body.email + ")</p>";
    message += "<p>"+req.body.content + "</p>";
    var transporter = nodemailer.createTransport('smtps://contact.lesregimes@gmail.com:LesR3gimes@smtp.gmail.com');
    var mailOptions = {
        from: '"Contact Régimes.net" <contact.lesregimes@gmail.com>', // sender address
        to: 'contact.lesregimes@gmail.com', // list of receivers
        subject: 'Nouveau formulaire de contact', // Subject line
        html: message // html body
    };
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
        	console.log(error);
        	res.status(500).end();
            return;
        }
        res.status(200).end();
    });
    
};
