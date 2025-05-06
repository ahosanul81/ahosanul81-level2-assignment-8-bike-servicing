"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const customer_route_1 = __importDefault(require("./app/modules/customer/customer.route"));
const globalErrorHandler_1 = require("./app/middleware/globalErrorHandler");
const bike_route_1 = __importDefault(require("./app/modules/bike/bike.route"));
const service_route_1 = __importDefault(require("./app/modules/service/service.route"));
const app = (0, express_1.default)();
// parser
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Bike Servicing Managment is running");
});
app.use("/api/customers", customer_route_1.default);
app.use("/api/bikes", bike_route_1.default);
app.use("/api/services", service_route_1.default);
app.use(globalErrorHandler_1.globalErrorHandler);
exports.default = app;
