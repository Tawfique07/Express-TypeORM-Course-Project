import { AppDataSource } from "./data-source";
import server from "./server";

AppDataSource.initialize()
	.then(async () => {
		server.start();
	})
	.catch((error) => console.log(error));
