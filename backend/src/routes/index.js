import { Router } from "express";

import ticketRouter from "#routes/tickets.js";
import authRouter from "#routes/auth.js";

const apiRouter = Router();

apiRouter.use("/tickets", ticketRouter);
apiRouter.use("/auth", authRouter);

export default apiRouter;

