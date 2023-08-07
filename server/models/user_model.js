import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    google_id: { type: String },
    google_authenticated: { type: Boolean, default: false },
    name: {
        type: String,
        default: "",
        required: true,
    },
    email: {
        type: String,
        default: '',
        required: true
    },
    username: {
        type: String,
        default: '',
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, { strict: false });

const User = mongoose.model("User", UserSchema);
export default User;