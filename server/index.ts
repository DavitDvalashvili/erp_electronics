import express from "express";
import componentRouter from "./routes/component.route";
import testRoute from "./routes/test.route";

const { PORT } = process.env;

const app = express();
app.use(express.json());

app.use(componentRouter);
app.use(testRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
