import { Resend } from "resend";

const resend = new Resend("re_aa2tFQRt_4mC4Rjc6V3Wmk8Cfywscxkxd");

export async function sendEmails(emails, message, imageUrl, subject) {
  try {
    // Define your HTML template
    const htmlTemplate = `
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            color: #333;
            margin: 0;
            padding: 0;
          }
          .container {
            width: 80%;
            margin: auto;
            padding: 20px;
            background-color: #f9f9f9;
            border: 1px solid #ddd;
            border-radius: 8px;
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
          }
          .header img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
          }
          .content {
            text-align: center;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src=${imageUrl} alt="Header Image">
          </div>
          <div class="content">
            <h1>your daily motivational quotes</h1>
            <p>${message}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "aiagentcoach@teamlumio.ai",
      to: [...emails],
      subject: subject,
      html: htmlTemplate,
    });

    if (error) {
      console.error({ error });
      return null;
    }

    console.log({ data });
    return data;
  } catch (error) {
    console.error("Error sending email:", error);
    return null;
  }
}
