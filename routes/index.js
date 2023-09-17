const express = require("express");
const app = express();
const { any } = require("webidl-conversions");
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //the middlewares should be declared before the matters since the order matters

const db = require("../connections");

const trainingsRouter = require("./trainings");
app.use("/trainings", trainingsRouter);

const membersRouter = require("./members");
app.use("/members", membersRouter);

const newsRouter = require("./news");
app.use("/news", newsRouter);

const projectsRouter = require("./projects");
app.use("/projects", projectsRouter);

const eventsRouter = require("./events");
app.use("/events", eventsRouter);

app.listen(8080, () => {
  console.log("Listening on port 8080");
});
