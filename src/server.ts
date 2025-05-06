import app from "./app";
import config from "./app/config";

app.listen(config.port, () => {
  console.log(`Bike Servicing Managment listening on port ${config.port}`);
});
