import User from "../model/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Appointment from "../model/appointments.model.js";
import Report from "../model/reports.model.js";
import Consultation from "../model/consultation.model.js";
import Medicine from "../model/medicine.model.js";
import { uploadToPinata } from "../utils/pinata.js";
import mongoose from "mongoose";
const scheduleAppointment = asyncHandler(async (req, res) => {
  const { doctorId, date, time, day, symptoms, note, reportIds } = req.body;
  const patientId = req.user._id;
  const appointment = await Appointment.create({
    patientId,
    doctorId,
    date,
    time,
    day,
    symptoms,
    note,
    hasReports: reportIds.length > 0 ? true : false,
  });
  console.log(req.body);
  if (!appointment) {
    throw new ApiError(400, "Appointment not created");
  }

  if (reportIds?.length > 0) {
    const objectIds = reportIds.map((id) => new mongoose.Types.ObjectId(id));

    await Report.updateMany(
      { _id: { $in: objectIds }, patientId },
      {
        $set: { appointmentId: appointment._id },
        $addToSet: {
          "reports.$[].sharedWithDoctors": { doctorId, sharedAt: new Date() },
        },
      }
    );
  }

  return res.status(201).json(
    new ApiResponse(201, {
      message: "Appointment created successfully",
      appointment,
    })
  );
});

const viewAppointments = asyncHandler(async (req, res) => {
  console.log(req.user._id);
  const appointments = await Appointment.aggregate([
    {
      $match: {
        patientId: req.user._id,
      },
    },
    {
      $lookup: {
        from: "doctors",
        localField: "doctorId",
        foreignField: "_id",
        as: "doctor",
      },
    },
    {
      $unwind: "$doctor",
    },
    {
      $lookup: {
        from: "users",
        localField: "doctor.userId",
        foreignField: "_id",
        as: "doctor.user",
      },
    },
    {
      $unwind: "$doctor.user",
    },
    {
      $project: {
        _id: 1,
        date: 1,
        time: 1,
        status: 1,
        day: 1,
        symptoms: 1,
        link: 1,
        note: 1,
        link: 1,
        "doctor.user.name": 1,
        "doctor.user.avatar": 1,
        "doctor.specialization": 1,
        "doctor.qualification": 1,
        "doctor.experience": 1,
        "doctor.consultationFee": 1,
      },
    },
  ]);

  return res.status(200).json(
    new ApiResponse(200, {
      appointments,
    })
  );
});

const addReports = asyncHandler(async (req, res) => {
  const { title, description, details } = req.body;
  if (!req.file) {
    throw new ApiError(400, "No file uploaded");
  }
  console.log(req.file);
  const fileHash = await uploadToPinata(req.file);

  const report = await Report.findOneAndUpdate(
    { patientId: req.user._id },
    {
      $push: {
        reports: {
          title,
          description,
          fileHash,
          fileType: req.file.mimetype,
          size: req.file.size,
        },
      },
      $set: {
        details,
      },
    },
    {
      upsert: true,
      new: true,
    }
  );

  if (!report) {
    const report = await Report.create({
      patientId: req.user._id,
      reports: [
        {
          title,
          description,
          fileHash,
          fileType: req.file.mimetype,
          size: req.file.size,
        },
      ],
      details,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, report, "Report uploaded successfully"));
  }

  return res
    .status(201)
    .json(new ApiResponse(201, report, "Report uploaded successfully"));
});

const viewConsultations = asyncHandler(async (req, res) => {
  const consultation = await Appointment.aggregate([
    {
      $match: {
        patientId: req.user._id,
      },
    },
    {
      $lookup: {
        from: "consultations",
        localField: "_id",
        foreignField: "appointmentId",
        as: "consultation",
      },
    },
    {
      $unwind: "$consultation",
    },
    {
      $lookup: {
        from: "doctors",
        localField: "doctorId",
        foreignField: "_id",
        as: "doctor",
      },
    },
    {
      $unwind: "$doctor",
    },
    {
      $lookup: {
        from: "users",
        localField: "doctor.userId",
        foreignField: "_id",
        as: "doctor.user",
      },
    },
    {
      $unwind: "$doctor.user",
    },
    {
      $project: {
        symptoms: 1,
        note: 1,
        "doctor.user.name": 1,
        "doctor.user.avatar": 1,
        "doctor.specialization": 1,
        "doctor.consultationFee": 1,
        "consultation.diagnosis": 1,
        "consultation.prescription": 1,
        "consultation.createdAt": 1,
        "consultation.followUp": 1,
      },
    },
  ]);
  console.log(consultation);

  return res.status(200).json(
    new ApiResponse(200, {
      consultation,
    })
  );
});

const viewReports = asyncHandler(async (req, res) => {
  const user = req.user.id;
  const report = await Report.findOne({ patientId: user });

  if (!report) {
    throw new ApiError(404, "Report not found");
  }

  return res.status(200).json(
    new ApiResponse(200, {
      report,
    })
  );
});

const deleteReport = asyncHandler(async (req, res) => {
  const { reportId } = req.params;

  const report = await Report.findByIdAndDelete(reportId);

  if (!report) {
    throw new ApiError(404, "Report not found");
  }

  return res.status(200).json(
    new ApiResponse(200, {
      message: "Report deleted successfully",
    })
  );
});

const addMedicine = asyncHandler(async (req, res) => {
  const { medicineName, dosage, timing, frequency, startDate, endDate, notes } =
    req.body;
  const patientId = req.user._id;

  const medicine = await Medicine.create({
    userId: patientId,
    medicineName,
    dosage,
    timing,
    frequency,
    startDate,
    endDate,
    notes,
  });

  if (!medicine) {
    throw new ApiError(400, "Medicine not added");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, medicine, "Medicine added successfully"));
});

const viewMedicine = asyncHandler(async (req, res) => {
  const patientId = req.user._id;
  const medicine = await Medicine.find({ userId: patientId });

  if (!medicine) {
    throw new ApiError(404, "Medicine not found");
  }

  return res.status(200).json(
    new ApiResponse(200, {
      medicine,
    })
  );
});

const deleteMedicine = asyncHandler(async (req, res) => {
  const { medicineId } = req.params;

  const medicine = await Medicine.findByIdAndDelete(medicineId);

  if (!medicine) {
    throw new ApiError(404, "Medicine not found");
  }
  return res.status(200).json(
    new ApiResponse(200, {
      message: "Medicine deleted successfully",
    })
  );
});

const deactivateMedicine = asyncHandler(async (req, res) => {
  const { medicineId } = req.params;

  const medicine = await Medicine.findByIdAndUpdate(medicineId, {
    active: false,
  });

  if (!medicine) {
    throw new ApiError(404, "Medicine not found");
  }

  return res.status(200).json(
    new ApiResponse(200, {
      message: "Medicine deactivated successfully",
    })
  );
});

const editMedicine = asyncHandler(async (req, res) => {
  const { medicineId } = req.params;
  const { medicineName, dosage, timing, frequency, startDate, endDate, notes } =
    req.body;

  const medicine = await Medicine.findByIdAndUpdate(medicineId, {
    medicineName,
    dosage,
    timing,
    frequency,
    startDate,
    endDate,
    notes,
  });

  if (!medicine) {
    throw new ApiError(404, "Medicine not found");
  }
  return res.status(200).json(
    new ApiResponse(200, {
      message: "Medicine updated successfully",
    })
  );
});

const reActivateMedicine = asyncHandler(async (req, res) => {
  const { medicineId } = req.params;

  const medicine = await Medicine.findByIdAndUpdate(medicineId, {
    active: true,
  });

  if (!medicine) {
    throw new ApiError(404, "Medicine not found");
  }

  return res.status(200).json(
    new ApiResponse(200, {
      message: "Medicine reactivated successfully",
    })
  );
});

export {
  scheduleAppointment,
  viewAppointments,
  addReports,
  viewConsultations,
  viewReports,
  deleteReport,
  addMedicine,
  viewMedicine,
  deleteMedicine,
  deactivateMedicine,
  editMedicine,
  reActivateMedicine,
};
