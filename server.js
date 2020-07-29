const path = require("path");
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const logger = require('morgan');

const apiRoutes = require("./routes/api");
const mainRoutes = require("./routes/main");
const models = require("./models");
const settings = require("./settings");

let app = express();

// init
mongoose.connect("mongodb://localhost/sample-app").catch(error => {
 console.log(err.message);
 process.exit(1);   
});
mongoose.set('debug', true);

app.use(logger('dev'));

// settings
app.set("view engine", "pug");
app.set("staticDir", path.join(__dirname, "static"));
app.use("/static", express.static(app.get("staticDir")));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// routes
app.use(apiRoutes);
app.use(mainRoutes);

app.use(function (err, req, res, next) {
  if (err.name === 'JsonSchemaValidation') {
      let errorMessage = "";
      try {
        errorMessage = `${err.validations.body[0].property} ${err.validations.body[0].messages.join(", ")}`
      } catch (error) {
        errorMessage = err.validations.body;
      }
      var responseData = {
          status: false,
          msg: 'Validation_Error',
          data: null,
          error: errorMessage
      };
      res.status(400).send(responseData);
  } else { // error handling
    // res.status(err.status || 500);
    // res.render('error', {
    //     message: err.message,
    //     error: err
    // });
    console.log(err);
    var errorData = {
        status: false,
        msg: err.message,
        data: null,
        error: err
    };
    // res.status(500).send("Something broke :( Please try again.");
    res.status(500).send(errorData);
    
  }
});

const expressSwagger = require('express-swagger-generator')(app);
let options = {
  swaggerDefinition: {
      info: {
          description: 'This is a sample server',
          title: 'Swagger',
          version: '1.0.0',
      },
      host: 'localhost:3000',
      basePath: '',
      produces: ["application/json"],
      schemes: ['http'],
      securityDefinitions: {
          JWT: {
              type: 'apiKey',
              in: 'header',
              name: 'Authorization',
              description: "",
          }
      }
  },
  basedir: __dirname, //app absolute path
  files: ['./routes/api.js'] //Path to the API handle folder
};
expressSwagger(options);

app.listen(3000);
