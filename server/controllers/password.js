const path = require('path')
const rootDir = require('../util/path')
const SibApiV3Sdk = require('sib-api-v3-sdk')
const {v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const ForgotPassword = require('../models/forgot-password');
const sequelize = require('../util/database');

require('dotenv').config()

exports.getResetPassword = async (req, res, next) => {
    UUID = req.params.id
    const UData = await ForgotPassword.findOne({ token :UUID })
    if( UData.isActive ){
        res.sendFile(path.join(rootDir, 'views', 'reset-password.html'));
    }
}

exports.postResetPassword = async (req, res, next) => {
    const UUID = req.body.id;
    const saltrounds = 10;
    const password1 = req.body.password1;
    const password2 = req.body.password2;
    
    if( !password1 === password2 ){ 
        return res.status(403).json( {'message': 'Passwords Does Not Match' } ) 
    }
    try {
        const token = await ForgotPassword.findOne( { token: UUID }).select('isActive userId')
        if(!token.isActive) { 
            res.status(400).json( { 'message': 'Invalid URL' } )
        }
        
        const hash = await bcrypt.hash(password1, saltrounds);
        console.log(hash)
        await User.updateOne( { _id: token.userId }, { password: hash } )
        console.log("Password Updated on Database");
        
        token.isActive = false
        await token.save();
        console.log('UUID is deactivated');

        res.status(201).json( { 'message': 'Password Updated Successfully ' } )
    } catch(err) {
        console.log(err);
        res.status(500).json( { message: 'Internal Server Error'})
    }
}

exports.getForgotPassword = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'forgot-password.html'));
}

exports.postForgotPassword = async (req, res, next) => {
    const user_email = req.body.email;
    User.findOne({ email: user_email }).select('id email')
    .then(async (user) => {
        if(!user) {
            res.status(404).json( { 'message': 'User with Email does not Exists' } );
        } else {
            const UUID = uuidv4();
            ForgotPassword.create({ token: UUID, isActive: true, userId: user._id })
            .then(() => {
                
                let defaultClient = SibApiV3Sdk.ApiClient.instance;

                let apiKey = defaultClient.authentications['api-key'];
                apiKey.apiKey = process.env.EMAILTOKEN;

                let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

                let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

                sendSmtpEmail.subject = "{{params.subject}}";
                sendSmtpEmail.htmlContent = "<html><body><h1>Click on <a target='_blank' href='http://localhost:3000/password/reset-password/{{params.parameter}}'>this link</a>to Reset the Password</h1></body></html>";
                sendSmtpEmail.sender = {"name":"Expense Tracker","email":"expensetracker@gmail.com"};
                sendSmtpEmail.to = [{"email": user_email,"name":"Sharpener Test"}];
                sendSmtpEmail.headers = {"Some-Custom-Name":"unique-id-1234"};
                sendSmtpEmail.params = {"parameter":UUID ,"subject":"Reset Password"};

                apiInstance.sendTransacEmail(sendSmtpEmail)
                .then((data) => {
                    console.log('API called successfully. Returned data: ' + JSON.stringify(data));
                    res.status(200).json(data)
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({messageId: "Internal Server Error"});
                })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({'message': 'Internal Server Error: @postForgotPassword'})
            }); 
        }
    })
    .catch(err => console.log(err));
}

        


    // const SibApiV3Sdk = require('sib-api-v3-sdk');
    // let defaultClient = SibApiV3Sdk.ApiClient.instance;

    // let apiKey = defaultClient.authentications['api-key'];
    // apiKey.apiKey = process.env.EMAILTOKEN;

    // let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    // let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    // sendSmtpEmail.subject = "{{params.subject}}";
    // sendSmtpEmail.htmlContent = "<html><body><h1>Click on <a target='_blank' href='{{params.parameter}}'>this link</a>to Reset the Password</h1></body></html>";
    // sendSmtpEmail.sender = {"name":"Expense Tracker","email":"expensetracker@gmail.com"};
    // sendSmtpEmail.to = [{"email": user_email,"name":"Sharpener Test"}];
    // sendSmtpEmail.headers = {"Some-Custom-Name":"unique-id-1234"};
    // sendSmtpEmail.params = {"parameter":"https://google.com","subject":"Reset Password"};

    // apiInstance.sendTransacEmail(sendSmtpEmail)
    //     .then((data) => {
    //         console.log('API called successfully. Returned data: ' + JSON.stringify(data));
    //         res.status(200).json(data)
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         res.status(500).json({messageId: "Internal Server Error"});
    //     })