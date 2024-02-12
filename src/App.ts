import HttpServer from "./http/http-server";
import UsersController from "./controllers/users";

class App {
	readonly httpServer = new HttpServer();

	readonly usersController = new UsersController(this.httpServer);

	listen(port: number) {
		this.httpServer.listen(port, () => {
			console.log("Server is running on port 4000");
		});
	}

	close() {
		this.httpServer.close();
	}
}

const app = new App();
app.listen(4000);
