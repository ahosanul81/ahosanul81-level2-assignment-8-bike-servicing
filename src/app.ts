import express, { Application } from "express";
import cors from "cors";
import customerRouter from "./app/modules/customer/customer.route";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import bikeRouter from "./app/modules/bike/bike.route";
import serviceRouter from "./app/modules/service/service.route";
const app: Application = express();

// parser
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Bike Servicing Managment is running");
});

app.use("/api/customers", customerRouter);
app.use("/api/bikes", bikeRouter);
app.use("/api/services", serviceRouter);

app.use(globalErrorHandler);
export default app;
