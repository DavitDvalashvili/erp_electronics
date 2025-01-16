import express from "express";
import componentRouter from "./routes/component.route";

const { PORT } = process.env;

const app = express();
app.use(express.json());

app.use(componentRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
