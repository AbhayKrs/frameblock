import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TemplateSchema = new Schema({
    template_name: { type: String, default: "", required: true },
    type: { type: String, required: true },
    font: { type: String, default: "", required: true },
    theme: { type: String, default: "", required: true },
    valid_fields: [{ type: String }],
}, { timestamps: true, strict: false });

const Template = mongoose.model("Template", TemplateSchema);
export default Template;