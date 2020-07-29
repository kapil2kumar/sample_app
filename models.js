const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Our Agency model.
 *
 * This is how we create, edit, delete, and retrieve Agency  via MongoDB.
 */
module.exports.Agency = mongoose.model("Agency", new mongoose.Schema({
  name:{ type: String, required: true, unique: true, minLength:2, maxLength:50 },
  address1:{ type: String, required: true, minLength:2, maxLength:100  },
  address2:{ type: String, required: false,  minLength:2, maxLength:100  },
  state:{ type: String, required: true,  minLength:2, maxLength:20  },
  city:{ type: String, required: true,  minLength:2, maxLength:20  },
  phone:{ type: Number, required: true,  pattern: "^[1-9]{1}[0-9]{9}$", minimum:1000000000, maximum:9999999999  }
}));

/**
 * Our Client model.
 *
 * This is how we create, edit, delete, and retrieve Agency  via MongoDB.
 */
module.exports.Client = mongoose.model("Client", new mongoose.Schema({
  agency_id: { type: Schema.Types.ObjectId, ref: 'Agency', required: true},
  name:{ type: String, required: true, minLength:2, maxLength:50 },
  email:{ type: String, required: true, pattern: "^[a-zA-Z0-9_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$", minLength: 3,maxLength: 50  },
  phone:{ type: Number, required: true,  pattern: "^[1-9]{1}[0-9]{9}$", minimum:1000000000, maximum:9999999999  },
  totalBill:{ type: Number, required: true, minimum:0 },
}));
