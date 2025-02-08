import mongoose,{Schema} from "mongoose";

const appointmentSchema=new Schema({
    patientId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    doctorId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'Doctor'
    },
    date:{
        type:Date,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['pending','approved','rejected', 'active', 'completed'],
        required:true,
        default:'pending'
    },
    day:{
        type:String,
        required:true
    },
    symptoms:{
        type: Array,           // Array of strings rahega please change if there is any other place it needs to be changed
        required:true
    },
    note:{
        type:String,
        default:''
    },
    hasReports: {
        type: Boolean,
        default: false
    },
    link:{
        type:String,
        default:''
    }
},
{timestamps:true})


const Appointment=mongoose.model('Appointment',appointmentSchema)

export default Appointment;
