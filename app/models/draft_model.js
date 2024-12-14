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
            isIconsVisible: { type: Boolean, default: false },
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
            isIconVisible: { type: Boolean, default: false },
            content_type: { type: String },
            content_data: [{
                label: { type: String },
                data_type: { type: String },
                data_list: [{ type: String }]
            }]
        },
        experience: {
            title: { type: String },
            isIconVisible: { type: Boolean, default: false },
            content: [{
                role: { type: String },
                company: { type: String },
                location: {
                    isVisible: { type: Boolean },
                    value: { type: String }
                },
                period: {
                    isVisible: { type: Boolean },
                    from: { type: String },
                    to: { type: String }
                },
                primary_desc: { type: String },
                sec_desc_type: { type: String },
                sec_desc_list: [{ type: String }],
                extra_desc_type: { type: String },
                extra_desc_list: [{ type: String }],
            }]
        },
        projects: {
            title: { type: String },
            isIconVisible: { type: Boolean, default: false },
            content: [{
                name: { type: String },
                project_link: { type: String },
                github_link: { type: String },
                primary_desc: { type: String },
                sec_desc_type: { type: String },
                sec_desc_list: [{ type: String }],
                extra_desc_type: { type: String },
                extra_desc_list: [{ type: String }],
            }]
        },
        education: {
            title: { type: String },
            isIconVisible: { type: Boolean, default: false },
            content: [{
                course: { type: String },
                institute: { type: String },
                location: {
                    isVisible: { type: Boolean },
                    value: { type: String }
                },
                period: {
                    isVisible: { type: Boolean },
                    from: { type: String },
                    to: { type: String }
                },
                grade_label: { type: String },
                grade_type: { type: String },
                grade_value: { type: String }
            }]
        },
        achievements: {
            title: { type: String },
            isIconVisible: { type: Boolean, default: false },
            content_type: { type: String },
            content_data: [{ type: String }]
        },
        references: {
            title: { type: String },
            isIconVisible: { type: Boolean, default: false },
            content_type: { type: String },
            content_data: [{ type: String }]
        }
    },
    view_order: {
        type: { type: String },
        fields_order: [{
            id: { type: String },
            field: { type: String }
        }]
    },
}, { timestamps: true, strict: false });

const Draft = mongoose.model("Draft", DraftSchema);
export default Draft;