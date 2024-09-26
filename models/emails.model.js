import mongoosh  from "mongoose";

const emailSchema = new mongoosh.Schema(
  {
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoosh.model("Email", emailSchema);
