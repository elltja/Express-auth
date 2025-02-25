export function getVerificationEmailTemplate(
  to: string,
  verificationLink: string
) {
  return `
        <!DOCTYPE html>
        <html>
            <head>
                <style>
                    a {
                        text-decoration: none;
                        padding: 10px;
                        border-radius: 5px;
                        background: black;
                        color: white;
                    }
                    body {
                        font-family: Arial, sans-serif;
                    }
                    .container {
                        padding: 20px;
                        border: 1px solid #ddd;
                        border-radius: 5px;
                        max-width: 600px;
                        margin: auto;
                    }
                    .footer {
                        margin-top: 20px;
                        font-size: 12px;
                        color: #888;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>Email Verification</h2>
                    <p>Dear user with email</p>
                    <p>Thank you for registering. Please click the button below to verify your email address: '${to}'</p>
                    <a href="${verificationLink}">Verify Your Email</a>
                    <p class="footer">If you did not request this email, please ignore it.</p>
                </div>
            </body>
        </html>
    `;
}
