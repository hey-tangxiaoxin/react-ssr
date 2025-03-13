import express, {
  type Application,
  Request,
  Response,
  NextFunction,
} from "express";
import compression from "compression";
import bodyParser from "body-parser";
import { expressjwt } from "express-jwt";
import cookieParser from "cookie-parser";
import { getPort } from "get-port-please";
import login from "./login";
import dashboard from "./dashboard";
import user from "./user";
import cms from "./cms";
import render from "./render";
import { secretKey } from "./const";
import { verify } from "jsonwebtoken";
import ai from './ai'

const app: Application = express();

app.use(cookieParser());
app.use(bodyParser());
app.use(compression());
app.use(express.static("dist/client"));
app.use(express.static("dist/server/static"));
app.use(
  expressjwt({
    secret: secretKey,
    algorithms: ["HS256"],
    requestProperty: "user",
    getToken(req: Request) {
      return req.headers.authorization;
    },
  }).unless({ path: [/^(?!\/api\b).*/, "/api/login"] })
);

app.use("/api/login", login);
app.use("/api/dashboard", dashboard);
app.use("/api/user", user);
app.use("/api/cms", cms);
app.use("/api/chat", ai);
app.use(render);

app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
  if (err.name === "UnauthorizedError") {
    res.status(401).send("invalid token...");
  }
});

getPort({ port: 13000, random: false }).then((port) => {
  app.listen(port, () => {
    console.log(`server is running, visit: http://localhost:${port}`);
  });
});
