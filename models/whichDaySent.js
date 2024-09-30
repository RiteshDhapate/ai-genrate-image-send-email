import mongoose from "mongoose";

// Define the schema with a field to store the days selected
const WhichDaySentSchema = new mongoose.Schema({
  days: {
    type: [String], // This will store an array of strings
    enum: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ], // Valid days of the week
    required: true,
  },
});

// Create the model
const WhichDaySent = mongoose.model("WhichDaySent", WhichDaySentSchema);

export default WhichDaySent;
