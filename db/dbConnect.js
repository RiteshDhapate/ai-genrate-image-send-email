import mongoosh from "mongoose";

export async function connectDb() {
  try {
    console.log("connecting to database");
    await mongoosh.connect(
      "mongodb+srv://lumio:DHAPATEPATIL817717@cluster0.i3k5h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("database connection established");
  } catch (error) {
    console.log("database connection failed");
    process.exit(1);
  }
}
