'use strict';

const request = require('request');
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jwt= require('jsonwebtoken');
var urlencodedParser = bodyParser.urlencoded({ extended: false });


let subscriptionKey = process.env.COMPUTER_VISION_SUBSCRIPTION_KEY;
let endpoint = process.env.COMPUTER_VISION_ENDPOINT;
if (!subscriptionKey) { throw new Error('Set your environment variables for your subscription key and endpoint.'); }

var uriBase = endpoint + 'vision/v2.1/analyze';

//const imageUrl ='https://upload.wikimedia.org/wikipedia/commons/3/3c/Shaki_waterfall.jpg';

// gets an imageUrl from the body and makes an api request to analyze an image
const imageAnalyzer = function (req, res) {
  if (req.body) {
    if (req.body.imageUrl) {
      const imageUrl = req.body.imageUrl;
      // Request parameters.
      const params = {
        'visualFeatures': 'Categories,Description,Color',
        'details': '',
        'language': 'en'
      };

      const options = {
        uri: uriBase,
        qs: params,
        body: '{"url": ' + '"' + imageUrl + '"}',
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': subscriptionKey
        }
      };
      request.post(options, (error, response, body) => {
        if (error) {
          console.log('Error: ', error);
          return;
        }
        let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
        return res.status(200).send(jsonResponse);
        //return res.send(jsonResponse);
      });
    }
    else {
      return res.send('{}');
    }

  } else {
    return res.send('{}');
  }
}

//verifying the token obtained from the user.
const verifyToken = function(req,res,next){
  var authorization = req.headers['authorization'];
  if(authorization === null) return res.sendStatus(404);
  jwt.verify(authorization,'myToken',function(err,req,res){
      if(err) return res.sendStatus(404);
      next();
  })

}

/**
* @swagger
* /api/v1/signIn/analyzeImage:
*   post:
*     description: generates an token for the user to analyze an image
*     parameters:
 *       - name: username
 *         in: formData
 *         type: string
 *         required: true  
 *       - name: password
 *         in: formData
 *         type: string
 *         required: true   
*     responses:
*       '200':
*         description: OK
*/
router.post('/signIn/analyzeImage',function(req,res){

    let username = req.body.username;
    let password = req.body.password;
    if(username==="saikumar" && password==="saikumar"){
        var userData = {
            user: username,
    };

    var token = jwt.sign(userData,'myToken',{expiresIn:  "0.2h"})
    return res.json({accessToken: token});
}
});


/**
* @swagger
* /api/v1/analyzeImage:
*   post:
*     description: analyze an image from the image url
*     parameters:
 *       - name: imageUrl
 *         in: formData
 *         type: string
 *         required: true     
*     responses:
*       '200':
*         description: OK
*/
router.post('/analyzeImage', urlencodedParser, imageAnalyzer)

/**
* @swagger
* /api/v1/user/analyzeImage:
*   post:
*     description: analyze an image from the image url
*     parameters:
 *       - name: imageUrl
 *         in: formData
 *         type: string
 *         required: true   
 *       - name: Authorization
 *         in: header
 *         type: string
 *         required: true    
*     responses:
*       '200':
*         description: OK
*/
router.post('/user/analyzeImage',urlencodedParser,verifyToken, imageAnalyzer )
module.exports = router;