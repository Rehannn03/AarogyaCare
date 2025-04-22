import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import Doctor from "../model/doctor.model.js";
import Appointment from "../model/appointments.model.js";
import Consultation from "../model/consultation.model.js";
import uploadOnCloudinary from '../utils/cloudinary.js'

const updateInfo=asyncHandler(async(req,res)=>{
    const user=req.user
    let degreeUrl=""
    
    
    if(req.files){  
        const degreePath=req.files?.path
        const result=await uploadOnCloudinary(degreePath)
        console.log(result);
        
        degreeUrl=result.secure_url
    }
    
    const {specialization,experience,qualification,consultationFee}=req.body
    console.log(req.body)
    const checkDoctor=await Doctor.findById(user._id)

    
    if(checkDoctor){
        const doctor=await Doctor.findByIdAndUpdate({
            _id:user._id
        },
        {
            $set:{
                specialization,
                experience,
                qualification,
                consultationFee,
                degree:degreeUrl || ""
            }
        },
        {
            new:true
        })

        if(!doctor){
            throw new ApiError(400,'Doctor not updated')
        }

        return res
        .status(200)
        .json(
            new ApiResponse(200,{
                message:'Doctor updated successfully',
                doctor
            })
        )
    }
    
    const doctor=await Doctor.create({
        userId:user._id,
        specialization,
        experience,
        qualification,
        consultationFee,
        degree:degreeUrl
    })

    if(!doctor){
        throw new ApiError(400,'Doctor not created')
    }

    return res
    .status(201)
    .json(
        new ApiResponse(201,{
            message:'Doctor created successfully',
            doctor
        })
    )
})

const getDoctor=asyncHandler(async(req,res)=>{
    const doctor=await Doctor.findOne({userId:req.user._id}).select('-createdAt -updatedAt -__v').populate('userId','name email profile avatar')
    if(!doctor){
        throw new ApiError(404,'Doctor not found')
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200,{
            doctor
        })
    )
})


const getAppointments=asyncHandler(async(req,res)=>{
    const checkVerify=await Doctor.findOne({userId:req.user._id})

    if(checkVerify.verified==false){
        throw new ApiError(403,'Doctor not verified')
    }

    const appointments=await Appointment.aggregate([
        {
            $match:{
                doctorId:checkVerify._id
            }
        },
        {
            $lookup:{
                from:'users',
                localField:'patientId',
                foreignField:'_id',
                as:'patient'
            }
        },
        {
            $unwind:'$patient'
        },
        {
            $project:{
                _id:1,
                date:1,
                time:1,
                status:1,
                symptoms:1,
                day:1,
                note:1,
                link: 1,
                patient:{
                    _id:1,
                    name:1,
                    email:1,
                    profile:1,
                    avatar: 1
                }
            }
        }
    ])

    return res
    .status(200)
    .json(
        new ApiResponse(200,{
            appointments
        })
    )
})

const updateAppointment=asyncHandler(async(req,res)=>{
    const {appointmentId,status,note}=req.body
    const checkVerify=await Doctor.findOne({userId:req.user._id})

    if(checkVerify.verified==false){
        throw new ApiError(403,'Doctor not verified')
    }
    if(status=='rejected' && !note){
        throw new ApiError(400,'Note is required for rejected appointments')   
    }

    const appointment=await Appointment.findByIdAndUpdate({
        _id:appointmentId
    },
    {
        $set:{
            status,
            note
        }
    },
    {
        new:true
    }).select('-createdAt -updatedAt -__v')

    if(!appointment){
        throw new ApiError(404,'Appointment not found')
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200,{
            message:'Appointment updated successfully',
            appointment
        })
    )
})

const activateAppointment=asyncHandler(async(req,res)=>{
    const {appointmentId,link}=req.body

    const appointment=await Appointment.findByIdAndUpdate({
        _id:appointmentId
    },
    {
        $set:{
            status:'active',
            link
        }
    },
    {
        new:true
    }).select('-createdAt -updatedAt -__v -patientId -doctorId -date -time -day -symptoms -note')

    if(!appointment){
        throw new ApiError(404,'Appointment not found')
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200,{
            message:'Appointment activated successfully',
            appointment
        })
    )
})

const fillConsultation=asyncHandler(async(req,res)=>{
    const {appointmentId,diagnosis,prescription,followUp,symptoms}=req.body
    const checkVerify=await Doctor.findOne({userId:req.user._id})
    const appointments=await Appointment.findByIdAndUpdate({
        _id:appointmentId
    },
    {
        $set:{
            status:'completed'
        }
    },
    {
        new:true
    }).select('-createdAt -updatedAt -__v -patientId -doctorId -date -time -day -symptoms -note')
    if(checkVerify.verified==false){
        throw new ApiError(403,'Doctor not verified')
    }
    const consultation=await Consultation.create({
        appointmentId,
        diagnosis,
        prescription,
        followUp,
        symptoms
    })

    if(!consultation){
        throw new ApiError(400,'Consultation not created')
    }

    return res
    .status(201)
    .json(
        new ApiResponse(201,{
            message:'Consultation created successfully',
            consultation
        })
    )
})

const getSpecialistCount=asyncHandler(async(_,res)=>{
    const count=await Doctor.aggregate([
        {
            $group:{
                _id:'$specialization',
                count:{$sum:1}
            }
        }
    ])

    return res
    .status(200)
    .json(
        new ApiResponse(200,{
            count
        })
    )
})

const earnings=asyncHandler(async(req,res)=>{
    const checkVerify=await Doctor.findOne({userId:req.user._id})
    if(checkVerify.verified==false){
        throw new ApiError(403,'Doctor not verified')
    }

    const appointments=await Appointment.aggregate([
        {
            $match:{
                doctorId:checkVerify._id,
                status:'completed'
            }
        },
        {
            $lookup:{
                from:'doctors',
                localField:'doctorId',
                foreignField:'_id',
                as:'doctor'
            }
        },
        {
            $unwind:'$doctor'
        },
        {
            $project:{
                doctor:{
                    specialization:1,
                    consultationFee:1
                }
            }
        }
    ])

    const allAppointments=await Appointment
        .find({
            doctorId:checkVerify._id,
        })

    const earnings=appointments.reduce((acc,appointment)=>{
        return acc+appointment.doctor.consultationFee
    },0)

    return res
    .status(200)
    .json(
        new ApiResponse(200,{
            earnings,
            completed:appointments.length,
            total: allAppointments.length
        })
    )

})

const getAllDoctors=asyncHandler(asyncHandler(async(_,res)=>{
    const doctors=await Doctor.find().select('-createdAt -updatedAt -__v').populate('userId','name avatar email profile')
    return res
    .status(200)
    .json(
        new ApiResponse(200,{
            doctors
        })
    )
}))

const updateDoctorDegree = asyncHandler(async (req, res) => {
    const degreePath = req.file?.path;
  
    if (!degreePath) {
      throw new ApiError(400, "No degree file uploaded");
    }
  
    const uploadedDegree = await uploadOnCloudinary(degreePath);
  
    const doctor = await Doctor.findByIdAndUpdate(
      req.user._id,
      { $set: { degree: uploadedDegree.secure_url } },
      { new: true }
    );
  
    if (!doctor) {
      throw new ApiError(400, "Doctor degree not updated");
    }
  
    return res.status(200).json(
      new ApiResponse(200, {
        message: "Doctor degree updated successfully",
        doctor,
      })
    );
  });
  

// Appointment time slot with doctor bussiness 
// Doctor specialisty wise grouping 
// Appointment status is live 
// Doctor consultations done plus how much money earned
export {
    updateInfo,
    getDoctor,
    getAppointments,
    updateAppointment,
    fillConsultation,
    getSpecialistCount,
    activateAppointment,
    earnings,
    getAllDoctors,
    updateDoctorDegree
}
