import express from "express";
import componentRouter from "./routes/component.route";
import deviceRouter from "./routes/device.route";
import cors from "cors";

const { PORT, CLIENT_API_URL } = process.env;

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(componentRouter);
app.use(deviceRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
