import DailyEmail from "../models/futureDailyEmails.js";

export function generateFutureDate(daysToAdd) {
  // Array of month names
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get the current date
  const currentDate = new Date();

  // Add the specified number of days to the current date
  const futureDate = new Date(
    currentDate.setDate(currentDate.getDate() + daysToAdd)
  );

  // Extract the month and day
  const month = months[futureDate.getMonth()];
  const day = futureDate.getDate();

  // Return the formatted date string
  return `${month} ${day}`;
}

export async function insertDailyEmail() {
  try {
    const aiImageGeneratorData = await fetch(
      "https://quote-generator-rvg3.onrender.com/generate-quote-image"
    );
    const aiGeneratedImageResponse = await aiImageGeneratorData.json();
    console.log("Ai generated template :", aiGeneratedImageResponse);
    // Create a new DailyEmail document
    const newDailyEmail = new DailyEmail({
      title: aiGeneratedImageResponse?.subject,
      image: aiGeneratedImageResponse?.cloudinaryResponse?.secure_url,
      message: aiGeneratedImageResponse?.message,
      scheduledDate: generateFutureDate(3),
    });

    // Save the document to the database
    const savedEmail = await newDailyEmail.save();

    console.log("Daily email created successfully:", savedEmail);
    return savedEmail;
  } catch (error) {
    console.error("Error creating daily email:", error);
    throw error; // Re-throw the error for the caller to handle if needed
  }
}
