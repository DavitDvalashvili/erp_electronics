import express from "express";
import componentRouter from "./routes/component.route";
import deviceRouter from "./routes/device.route";

const { PORT } = process.env;

const app = express();
app.use(express.json());

app.use(componentRouter);
app.use(deviceRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
