var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const path =require('path');

const analyzeImageApi = require("./routes/analyze-image.js");
app.use('/assets',express.static('assets'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require ('swagger-ui-express');

const swaggerOptions ={
swaggerDefinition: {
  info: {
    title: 'Image analyzer api',
    description: 'implementation of swagger for image analyzer api',
    contact: {
      name:' sai Kumar Erpina'
    },
    basePath:"/api/v1",
    servers:["http://159.65.32.185:3000"]
  }
},
apis: ['./routes/analyze-image.js']
}

const swaggerDocs= swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/v1', express.static(path.join(__dirname, 'routes')));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use('/api/v1/analyzeImage',analyzeImageApi);

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });
  
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
    });
  });

  app.listen(3000);