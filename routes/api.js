const bcrypt = require("bcryptjs");
const express = require("express");
const validate = require('express-jsonschema').validate;

const auth = require("../auth");
const models = require("../models");
const settings = require("../settings");
const inputValidation = require('./variables/input_validation');
const send_response = require('../send_response');

let router = express.Router();

/**
 * This API is use to create token to use in others API
 * @route GET /generate_token
 * @group Generate Autorization Token
 * @returns {object} 200 - An object {status, msg, data, error}
 * @returns {Error}  500 - {status, msg, data, error}
 */
router.get("/generate_token", (req, res) => {
  try {
    let hash = bcrypt.hashSync(settings.JWT_USER_PASSWORD, settings.BCRYPT_WORK_FACTOR);
    let user = {
      username: settings.JWT_USERNAME,
      hash: hash
    }
    let token = auth.createUserSession(req, res, user);
    // return response
    let responseData = {
      status: true,
      msg: 'Success',
      data: token,
      error: ""
    };
    return send_response.sendResponse(res, responseData, 200);
  } catch (error) {
    // return error
    var errorData = {
      status: false,
      msg: error.message,
      data: null,
      error: error
    };
    return send_response.sendResponse(res, responseData, 500);
  }
});

/**
 * @typedef Agency
 * @property {string} name.required -name of agency
 * @property {string} address1.required -address1 of agency
 * @property {string} address2 -address2 of agency
 * @property {string} state.required -state of agency
 * @property {string} city.required -city of agency
 * @property {integer} phone.required - phone of agency - eg: 123456789
 */
/**
 * @typedef Client
 * @property {string} name.required -name of client
 * @property {string} email.required -email of client - eg: example@example.com
 * @property {integer} phone.required - phone of client - eg: 123456789
 * @property {integer} totalBill.required - totalBill of client - eg: 50
 */
/**
 * JSON parameters require a model. createAgencyAndClient model
 * @typedef ReqCreateAgencyAndClientJSON
 * @property {Agency.model} agency.required - agency making request - eg: Agency
 * @property {Client.model} client.required - agency making request - eg: Client
 */
/**
 * This API is use to Create agency and client
 * @route POST /createAgencyAndClient
 * @group Create agency and client
 * @param {ReqCreateAgencyAndClientJSON.model} name.body.required - createAgencyAndClient
 * @returns {object} 200 - An object {status, msg, data, error}
 * @returns {Error}  500,400,401 - {status, msg, data, error}
 * @security JWT
 */
router.post("/createAgencyAndClient", auth.authnticateUser, validate({
  body: inputValidation.validateCreateAgencyAndClient
}), async (req, res) => {
  const Agency = models['Agency'];
  const Client = models['Client'];

  let agency = null;
  let client = null;

  await Agency.findOne({
    name: req.body.agency.name
  }).then(existAgency => {
    if (existAgency && existAgency._id) {
      agency = existAgency;
      console.log("existAgency", existAgency);
    }
  }).catch(err => {
    console.log(err);
    return send_response.sendResponse(res, {
      status: false,
      msg: 'Something went wrong!',
      data: "",
      error: err.message
    }, 500);
  });

  let newAgency_id = null;
  if (agency && agency._id) { //check clent is exist with agency
    await Client.findOne({
      name: req.body.client.name,
      agency_id: agency._id
    }).then(existClient => {
      if (existClient && existClient._id) {
        client = existClient;
        console.log("existClient", existClient);
        return send_response.sendResponse(res, {
          status: false,
          msg: 'Client name is already exist!',
          data: "",
          error: ""
        }, 200);
      }
    }).catch(err => {
      console.log(err);
      return send_response.sendResponse(res, {
        status: false,
        msg: 'Something went wrong!',
        data: "",
        error: err.message
      }, 500);
    });
  } else {
    //create agency
    let newAgency = new Agency(req.body.agency);
    await newAgency.save().then(newAgency => {
      newAgency_id = newAgency._id;
      agency = newAgency;
      console.log("newAgency", newAgency);
    }).catch(err => {
      console.log(err);
      return send_response.sendResponse(res, {
        status: false,
        msg: 'Something went wrong!',
        data: "",
        error: err.message
      }, 500);
    });
  }

  if (!client) {
    //create client
    req.body.client.agency_id = agency._id;
    let newClient = new Client(req.body.client);
    await newClient.save().then(newClient => {
      client = newClient;
      console.log("newClient", newClient);
      let data = {
        agency: agency,
        client: client
      }
      //send success response
      return send_response.sendResponse(res, {
        status: true,
        msg: 'Success',
        data: data,
        error: ""
      }, 200);
    }).catch(err => {
      console.log(err);
      //delete agency if newely created
      console.log("newAgency_id", newAgency_id);
      if (newAgency_id) {
        deleteStatus = Agency.delete({
          _id: newAgency_id
        });
        console.log(deleteStatus);
      }
      return send_response.sendResponse(res, {
        status: false,
        msg: 'Something went wrong!',
        data: "",
        error: err.message
      }, 500);
    });
  }
});


/**
 * JSON parameters require a model. createAgencyAndClient model
 * @typedef ReqUpdateJSON
 * @property {string} _id.required -id of client - eg: 5f2173a4b5c2ab4a98c6e271
 * @property {string} name.required -name of client
 * @property {string} email.required -email of client - eg: example@example.com
 * @property {integer} phone.required - phone of client - eg: 123456789
 * @property {integer} totalBill.required - totalBill of client - eg: 500
 */
/**
 * This API is use to update client information
 * @route PUT /updateClient
 * @group Update client
 * @param {ReqUpdateJSON.model} name.body.required - updateClient
 * @returns {object} 200 - An object {status, msg, data, error}
 * @returns {Error}  500,400,401 - {status, msg, data, error}
 * @security JWT
 */
router.put("/updateClient", auth.authnticateUser, validate({body: inputValidation.validateUpdateClient}), async (req, res) => {
  const Client = models['Client'];
  let conditions = {
    _id: req.body._id
  };
  var updateData = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    totalBill: req.body.totalBill
  }
  await Client.update(conditions, {
    $set: updateData
  }).then(updateData => {
    console.log(updateData);
    if (updateData && updateData.ok == 1 && updateData.nModified > 0) {
      return send_response.sendResponse(res, {
        status: true,
        msg: 'Success',
        data: "",
        error: ""
      }, 200);
    } else if (updateData && updateData.ok == 1 && updateData.n >= 1) {
      return send_response.sendResponse(res, {
        status: false,
        msg: 'NO data update',
        data: "",
        error: ""
      }, 200);
    } else {
      return send_response.sendResponse(res, {
        status: false,
        msg: 'Invalid client id',
        data: "",
        error: ""
      }, 200);
    }
  }).catch(err => {
    console.log(err);
    console.log(err.message);
    return send_response.sendResponse(res, {
      status: false,
      msg: 'Something went wrong!',
      data: "",
      error: err.message
    }, 500);
  });
});

/**
 * This API is use to get the name of agency along with client details which has top client(s) with maximum total bill
 * @route GET /topMostAgencyWithClient
 * @group Top most agency with client
 * @returns {object} 200 - An object {status, msg, data, error}
 * @returns {Error}  500,400,401 - {status, msg, data, error}
 * @security JWT
 */
router.get("/topMostAgencyWithClient", async (req, res) => {
  const Client = models['Client'];
  let aggregate = [
    // loogkup
    {
      $lookup: {
        from: "agencies",
        localField: "agency_id", // field in the orders collection
        foreignField: "_id", // field in the items collection
        as: "agencyInfo",
      }
    },
    // First Stage
    {
      $group: {
        // _id: "$agency_id",
        _id: { name: "$name", agency_id: "$agency_id", _id: "$_id" },
        TotalBill: {
          $sum: "$totalBill"
        },
        groups: {
          $addToSet: {
            agencyInfo: "$agencyInfo",
          }
        }
      }
    },
    // Second Stage
    {
      $sort: {
        TotalBill: -1
      }
    },
    //Limit by 1 to get year when maximum models where made
    {
      $limit: 1
    },
  ];

  await Client.aggregate(aggregate).exec().then(data => {
    console.log(JSON.stringify(data));
    data= data[0];
    let resData={
      AgencyName: data.groups[0].agencyInfo[0].name, 
      ClientName:data._id.name, 
      TotalBill:data.TotalBill
    }
    return send_response.sendResponse(res, {
      status: true,
      msg: 'Success',
      data: resData,
      error: ""
    }, 200);

  }).catch(err => {
    console.log(err);
    console.log(err.message);
    return send_response.sendResponse(res, {
      status: false,
      msg: 'Something went wrong!',
      data: "",
      error: err.message
    }, 500);
  });
});

module.exports = router;