import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, default: "", required: true },
    email: { type: String, default: "", required: true },
    username: { type: String, default: "", required: true },
    password: { type: String, required: true },
    dob: { type: String, default: "" },
    gender: { type: String, default: "" },
    phone: { type: String, default: "" },
    last_login: { type: Date },
    created_on: { type: Date },
    google_id: { type: String },
    google_authenticated: { type: Boolean, default: false },
}, { strict: false });

const User = mongoose.model("User", UserSchema);
export default User;