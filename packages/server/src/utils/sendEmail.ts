import nodemailer from "nodemailer";

export async function sendEmail(to: string, html: string) {
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: "qkfrnkvqiykpx47v@ethereal.email",
            pass: "WpgRF2Rnz3jCFq8QYQ",
        },
    });

    let info = await transporter.sendMail({
        from: "<huddle@gmail.com>",
        to,
        subject: "Change password",
        html,
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
