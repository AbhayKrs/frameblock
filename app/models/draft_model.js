import mongoose from "mongoose";
const Schema = mongoose.Schema;

const DraftSchema = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    draft_name: { type: String, default: "", required: true },
    template_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Template', required: true },
    template_name: { type: String, default: "", required: true },
    data: {
        fullname: { type: String },
        role: { type: String },
        socials: {
            title: { type: String },
            phone_code: { type: String },
            phone_number: { type: String },
            email: { type: String },
            portfolio_label: { type: String },
            portfolio_value: { type: String },
            github_label: { type: String },
            github_value: { type: String },
            linkedin_label: { type: String },
            linkedin_value: { type: String },
        },
        skills: {
            title: { type: String },
            content_type: { type: String },
            content_data: [{
                label: { type: String },
                content_values: [{ type: String }]
            }]
        },
        experience: {
            title: { type: String },
            content: [{
                role: { type: String },
                company: { type: String },
                location: { type: String },
                period_from: { type: String },
                period_to: { type: String },
                description_type: { type: String },
                description_list: [{ type: String }]
            }]
        },
        projects: {
            title: { type: String },
            content: [{
                name: { type: String },
                project_link: { type: String },
                github_link: { type: String },
                description_type: { type: String },
                description_list: [{ type: String }]
            }]
        },
        education: {
            title: { type: String },
            content: [{
                course: { type: String },
                institute: { type: String },
                location: { type: String },
                period_from: { type: String },
                period_to: { type: String }
            }]
        },
        achievements: {
            title: { type: String },
            content_type: { type: String },
            content_data: [{
                title: { type: String },
                period: { type: String }
            }]
        },
        interests: {
            title: { type: String },
            content_type: { type: String },
            content_data: [{ type: String }]
        },
        references: {
            title: { type: String },
            content_type: { type: String },
            content_data: [{ type: String }]
        }
    },
    created_on: { type: Date },
    last_modified: { type: Date },
}, { strict: false });

const Draft = mongoose.model("Draft", DraftSchema);
export default Draft;