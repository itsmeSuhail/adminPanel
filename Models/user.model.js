import mongoose from "mongoose";
import { encrypt } from "../utils/PasswordManager/protector.js";
const { Schema } = mongoose;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  imgLink: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default:false
  },
  isActive:{
    type:Boolean,
    default:true
  },
 },{
  timestamps:true
});
// userSchema.pre("save",function(){
//   this.password=encrypt(this.password);
// })
export default mongoose.model("User", userSchema)