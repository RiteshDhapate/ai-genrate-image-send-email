import mongoose from "mongoose";

const dailyEmailSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    scheduledDate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const DailyEmail = mongoose.model("DailyEmail", dailyEmailSchema);

export default DailyEmail;