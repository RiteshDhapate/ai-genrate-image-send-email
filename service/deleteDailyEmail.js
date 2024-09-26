import DailyEmail from "../models/futureDailyEmails.js";

export async function deleteDailyEmail(id) {
  try {
    // Find the document by id and delete it
    const deletedEmail = await DailyEmail.findByIdAndDelete(id);

    if (!deletedEmail) {
      console.log("No daily email found with the given id:", id);
      return null;
    }

    console.log("Daily email deleted successfully:", deletedEmail);
    return deletedEmail;
  } catch (error) {
    console.error("Error deleting daily email:", error);
    throw error; // Re-throw the error for the caller to handle if needed
  }
}
