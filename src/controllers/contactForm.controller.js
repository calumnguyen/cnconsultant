var mongoose = require("mongoose");
var Form = require("../models/form.model");
//async for async tasks
const clientHelper = require("../helpers/users.helper");
//helper functions
const responseHelper = require("../helpers/response.helper");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


var submitForm = async (req, res) => {
    try{
        const { firstName, lastName, phone, email } = req.body;
        if (firstName == "" || firstName == undefined) {
            let err = "firstName is required";
            return responseHelper.requestfailure(res, err);
        }
        if (lastName == "" || lastName == undefined) {
            let err = "lastName is required";
            return responseHelper.requestfailure(res, err);
        }
        if (phone == "" || phone == undefined) {
            let err = "phone is required";
            return responseHelper.requestfailure(res, err);
        }
        if (email == "" || email == undefined) {
            let err = "email is required";
            return responseHelper.requestfailure(res, err);
        }

        let bodyData = req.body;
        if(bodyData['lang'] == 'en'){
            bodyData['lang'] = 'english';  
        }else{
            bodyData['lang'] = 'Vietnamese';  
        }
        
        const newform = await Form.create(bodyData);
        // send email to sender after form creation here
        var templateId = "d-879557cc3f5c4517ac739a8b63ab2477";  ///////////// english template
        if(req.body.lang == 'es'){
            templateId = "d-a44117345cef4ba5b2655cecd6b71bc2";  ///////////// Vietnamese template
        }
        const msg = {
            to: email,
            from: 'calum@cnc.partners', // Use the email address or domain you verified above
            templateId: templateId,
            dynamic_template_data: {
              firstName: firstName
            }
          };
        //ES6
        await sgMail
        .send(msg)
        .then(() => {}, error => {
            console.error(error);
    
            if (error.response) {
            console.error(error.response.body)
            }
        });
        // //////////////////////////////////////////////////////////////////////////////////
        var message = "Contact form submit successful";
        var responseData = { form: newform };
        return responseHelper.success(res, responseData, message);
    } catch (error) {
        responseHelper.requestfailure(res, error);
    }
};
var getAllForms = async (req, res) => {
    try{
        if(req.query?.startDate && req.query?.endDate){
            let startDate = new Date(req.query.startDate);
            let endDate = new Date(req.query.endDate);
            endDate.setDate(endDate.getDate() + 1);
            var allForms = await Form.find({created_at:{$gte: startDate, $lte: endDate}}).lean();
            
        }else{
            let startDate = new Date();
            startDate.setHours(0,0,0,0);
            let endDate = new Date();
            endDate.setDate(startDate.getDate() + 1);
            endDate.setHours(0,0,0,0);
            var allForms = await Form.find({created_at:{$gte: startDate, $lte: endDate}}).lean();
        }        
        var responseData = allForms ;
        return responseHelper.success(res, responseData);
    } catch (error) {
        console.log(error)
        responseHelper.requestfailure(res, error);
    }
};

module.exports = {
    submitForm,
    getAllForms,
  };
  