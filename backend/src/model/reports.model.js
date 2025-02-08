import mongoose,{Schema} from "mongoose";

const reportSchema=new Schema({
    patientId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        index: true
    },
    appointmentId: {  // Link report to appointment
        type: Schema.Types.ObjectId,
        ref: 'Appointment',
        index: true,
        default: null
    },
    reports: [{
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        fileHash: {
            type: String,
            required: true
        },
        fileType: {
            type: String,
            required: true,
            enum: ['application/pdf']
        },
        uploadDate: {
            type: Date,
            default: Date.now
        },
        size: {
            type: Number,
            required: true
        },
        sharedWithDoctors: [{  // Track which doctors can access this report
            doctorId: {
                type: Schema.Types.ObjectId,
                ref: 'Doctor'
            },
            sharedAt: {
                type: Date,
                default: Date.now
            }
        }]
    }],
    details: {
        type: String,
        required: true
    }
}, { timestamps: true })   

reportSchema.index({ createdAt: -1 });
reportSchema.index({ 'reports.uploadDate': -1 });

const Report=mongoose.model('Report',reportSchema)

export default Report;