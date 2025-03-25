import express from "express";
import componentRouter from "./routes/component.route";
import deviceRouter from "./routes/device.route";
import cors from "cors";
import path from "path";

const { PORT, CLIENT_API_URL } = process.env;

const app = express();
app.use(express.json());

// Serve static files from the 'images' folder
app.use("/files/images", express.static(path.join(__dirname, "files/images")));
app.use("/files/pdf", express.static(path.join(__dirname, "files/pdf")));

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
