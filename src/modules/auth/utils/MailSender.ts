import Mailgen from "mailgen";
import nodemailer, { Transporter } from "nodemailer";

export class MailSender {
	private transporter: Transporter;
	private mailGenerator: Mailgen;
	constructor() {
		this.transporter = nodemailer.createTransport({
			host: process.env.MAIL_HOST,
			port: Number(process.env.MAIL_PORT),
			auth: {
				user: process.env.MAIL_USER,
				pass: process.env.MAIL_PASS,
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
			from: "example@courseapp.com",
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
