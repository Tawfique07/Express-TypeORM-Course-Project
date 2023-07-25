import Mailgen from "mailgen";
import nodemailer, { Transporter } from "nodemailer";

export class MailSender {
	private transporter: Transporter;
	private mailGenerator: Mailgen;
	constructor() {
		this.transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.GMAIL_USER,
				pass: process.env.GMAIL_PASS,
			},
		});

		this.mailGenerator = new Mailgen({
			theme: "default",
			product: {
				name: "Course App",
				link: "https://mailgen.js/",
				// Custom copyright notice
				copyright: "Copyright © 2023 Course App. All rights reserved.",
			},
		});
	}

	async send(receiverEmail: string, messageToSend: string) {
		const email = {
			body: {
				title: messageToSend,
				outro: "Use this OTP to reset your password",
			},
		};

		const mail = this.mailGenerator.generate(email);

		const message = {
			from: process.env.GMAIL_USER,
			to: receiverEmail,
			subject: "Reset Password",
			html: mail,
		};

		try {
			const info = await this.transporter.sendMail(message);
			return info;
		} catch (error) {
			throw error;
		}
	}
}

export default new MailSender();
