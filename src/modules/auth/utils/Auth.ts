import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import userService from "../services/UserService";

export default class Auth {
	private opts = {
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: process.env.JWT_SECRET,
	};

	authenticate() {
		return passport.authenticate("jwt", { session: false });
	}

	authenticateAdmin(checkAdmin: any) {
		return passport.authenticate("jwt", { session: false }, checkAdmin);
	}

	config() {
		passport.use(
			new JwtStrategy(this.opts, async (jwt_Payload, done: Function) => {
				try {
					const user = await userService.getUser(jwt_Payload.id);
					if (user) {
						return done(null, user);
					} else {
						return done(null, false);
					}
				} catch (error) {
					return done(error, false);
				}
			})
		);
	}
}
