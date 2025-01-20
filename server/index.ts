import express from "express";
import componentRouter from "./routes/component.route";
<<<<<<< HEAD
import deviceRouter from "./routes/device.route";
=======
>>>>>>> f8a9e46c928d6fa62a119681ce8c02c72b8ac3ba

const { PORT } = process.env;

const app = express();
app.use(express.json());

app.use(componentRouter);
<<<<<<< HEAD
app.use(deviceRouter);
=======
>>>>>>> f8a9e46c928d6fa62a119681ce8c02c72b8ac3ba

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
