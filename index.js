// all import statements

import express from "express";
import cors from "cors";
import { sendEmails } from "./service/emailService.js";
import cron from "node-cron";
import { connectDb } from "./db/dbConnect.js";
import Email from "./models/emails.model.js";

const app = express();

// express middleware
app.use(express.json());
app.use(cors());

// initialize the all services
async function init() {
  await connectDb();
}

init();

// send email route
app.post("/send-email", async function (req, res) {
  try {
      const { email, message } = req.body;
         const aiImageGeneratorData = await fetch(
           "https://quote-generator-90rw.onrender.com/generate-quote-image"
         );
         const aiGeneratedImageResponse = await aiImageGeneratorData.json();
    const result = await sendEmails(
      [email],
      message,
      aiGeneratedImageResponse?.cloudinaryResponse?.secure_url
    );
    if (!result) {
      res.status(400).json({ message: "email send unsuccessful" });
    }
    res.json({ message: "email send successful", data: result });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});

// add emails
app.post("/add-emails", async (req, res) => {
  try {
    const { emails } = req.body;

    if (!Array.isArray(emails)) {
      return res
        .status(400)
        .json({ message: "Invalid input format, expected an array of emails" });
    }

    const emailDocs = emails.map((email) => ({ email }));

    // Insert emails into the database
    await Email.insertMany(emailDocs, { ordered: false });

    res.status(200).json({ message: "Emails added successfully" });
  } catch (error) {
    if (error.code === 11000) {
      res
        .status(400)
        .json({ message: "Some emails already exist in the database" });
    } else {
      res.status(500).json({ message: "Server error", error });
    }
  }
});

// Schedule the task to run daily at 9 AM
cron.schedule("0 9 * * *", async () => {
  console.log("Running daily email task...");

  try {
    // Retrieve all email addresses from the database
    const emails = await Email.find().select("email -_id").lean();
    const emailAddresses = emails.map((doc) => doc.email);
    const aiImageGeneratorData = await fetch(
      "https://quote-generator-90rw.onrender.com/generate-quote-image"
    );
    const aiGeneratedImageResponse = await aiImageGeneratorData.json();
    if (aiGeneratedImageResponse) {
      // Send emails to all addresses
      const result = await sendEmails(
        emailAddresses,
        "Daily update message",
        aiGeneratedImageResponse?.cloudinaryResponse?.secure_url
      );
      if (result) {
        console.log("Emails sent successfully.");
      } else {
        console.log("Failed to send emails.");
      }
    } else {
      console.log("failed to image generate");
    }
  } catch (error) {
    console.error("Error during scheduled email task:", error);
  }
});

// listen the app on 2000 port
app.listen(2000, () => {
  console.log("server listening on port 2000");
});
