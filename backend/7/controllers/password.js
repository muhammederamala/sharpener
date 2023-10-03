const path = require('path');
const brevo = require('@getbrevo/brevo');

const dotenv = require('dotenv'); 
dotenv.config(); 

exports.getPasswordForm = async (req,res,next) =>{
    try{
        const filePath = path.join(__dirname, '../public/user/resetPassword.html');
        res.sendFile(filePath)
    }
    catch(err){
        console.log(err)
    }
}


exports.sendEmail = async (req, res) => {
    try {
        let defaultClient = brevo.ApiClient.instance;

        let apiKey = defaultClient.authentications['api-key'];
        apiKey.apiKey = process.env.SENDINBLUE_API_KEY ;

        let apiInstance = new brevo.TransactionalEmailsApi();
        let sendSmtpEmail = new brevo.SendSmtpEmail();
        
        const { email } = req.body;

        sendSmtpEmail.subject = "password reset";
        sendSmtpEmail.htmlContent = "<html><body><h1>Common: This is my first transactional email {{params.parameter}}</h1></body></html>";
        sendSmtpEmail.sender = { "name": "John", "email": "muhammederamala15@gmail.com.com" };
        sendSmtpEmail.to = [
        { "email": email, "name": "sample-name" }
        ];
        sendSmtpEmail.replyTo = { "email": "example@brevo.com", "name": "sample-name" };
        sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
        sendSmtpEmail.params = { "parameter": "My param value", "subject": "common subject" };


        apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
        console.log('API called successfully. Returned data: ' + JSON.stringify(data));
}, function (error) {
  console.error(error);
});

        res.status(200).json({ message: 'Password reset email sent successfully' });
    } catch (error) {
        console.error('Error sending password reset email:', error);
        res.status(500).json({ message: 'An error occurred while sending the password reset email' });
    }
};
