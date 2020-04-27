'use strict';

const request = require('request');
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });


let subscriptionKey = process.env.COMPUTER_VISION_SUBSCRIPTION_KEY;
let endpoint = process.env.COMPUTER_VISION_ENDPOINT;
if (!subscriptionKey) { throw new Error('Set your environment variables for your subscription key and endpoint.'); }

var uriBase = endpoint + 'vision/v2.1/analyze';

//const imageUrl ='https://upload.wikimedia.org/wikipedia/commons/3/3c/Shaki_waterfall.jpg';


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
router.post('/', urlencodedParser, function (req, res) {
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
        return res.status(200).json(jsonResponse);
        //return res.send(jsonResponse);
      });
    }
    else {
      return res.send('{}');
    }

  } else {
    return res.send('{}');
  }
});



module.exports = router;