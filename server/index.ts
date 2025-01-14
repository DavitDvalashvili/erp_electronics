import express from "express";
import componentRouter from "./routes/component.route";

const { PORT } = process.env;

const app = express();

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(componentRouter);
