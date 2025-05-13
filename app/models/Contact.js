import mongoose, { model, Schema } from "mongoose";

const contactSchema = new Schema({
  name: String,
  email:  {
    type:String,
    default: "not provided"
  },
  message:String,
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Contact = mongoose.models.Contact || model("Contact", contactSchema);

export default Contact;