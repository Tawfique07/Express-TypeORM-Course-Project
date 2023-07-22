import dotenv from "dotenv";
import express, { Application } from "express";
import Routes from "./routes";

dotenv.config();

class Server {
	private app: Application;
	private routes: Routes;
	private PORT: Number;

	constructor() {
		this.app = express();
		this.routes = new Routes();
		this.PORT = Number(process.env.SERVER_PORT);
		this.config();
	}

	private config() {
		this.app.use(express.json());
		this.app.set("port", this.PORT);

		this.routes.init(this.app);
	}

	public start() {
		this.app.listen(this.app.get("port"), () => {
			console.log(`Listening on port ${this.PORT}`);
		});
	}
}

export default new Server();
