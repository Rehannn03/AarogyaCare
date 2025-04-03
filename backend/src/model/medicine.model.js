import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    medicineName: {
      type: String,
      required: true,
    },
    dosage: {
      type: String,
      required: true,
    },
    timing: {
      type: String,
      enum: ["before_meal", "after_meal", "with_meal"],
      required: true,
    },
    frequency: [
      {
        time: {
          type: String,
          enum: ["morning", "afternoon", "evening", "night"],
          required: true,
        },
        hour: {
          type: Number,
        },
        minute: {
          type: Number,
        },
      },
    ],
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    notes: String,
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Medicine = mongoose.model("Medicine", medicineSchema);

export default Medicine;
