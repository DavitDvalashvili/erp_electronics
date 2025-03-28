import express from "express";
import componentRouter from "./routes/component.route";
import deviceRouter from "./routes/device.route";
import fileRouter from "./routes/file.route";
import notificationRouter from "./routes/notification.route";
import cors from "cors";
import path from "path";

const { PORT, CLIENT_API_URL } = process.env;

const app = express();
app.use(express.json());

// Serve static files from the 'images' folder
app.use("/files/images", express.static(path.join(__dirname, "files/images")));
app.use(
  "/files/documents",
  express.static(path.join(__dirname, "files/documents"))
);

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(componentRouter);
app.use(deviceRouter);
app.use(fileRouter);
app.use(notificationRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
