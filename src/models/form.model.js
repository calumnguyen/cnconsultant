var mongoose = require("mongoose");
var Schema = mongoose.Schema;

formSchema = new Schema(
    {
      firstName: {
        type: String,
        required: true
      },
      lastName: {
        type: String,
        required: true
      },
      phone: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      companyName: {
        type: String
      },
      companyAddress: {
        type: String
      },
      serviceIndustry: {
        type: String
      },
      timeToCall: {
        type: String
      },
      lang:{
        type: String
      }
    },
    {
      timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
      },
    }
  );
  
  module.exports = mongoose.model("Form", formSchema);