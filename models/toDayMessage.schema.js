import mongoosh from "mongoose";
const toDayMessageSchema = new mongoosh.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    date: Date.now(),
  },
  {
    timestamps: true,
  }
);

export default mongoosh.model("message", toDayMessageSchema);
