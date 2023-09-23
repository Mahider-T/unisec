const express = require("express");
const app = express();
const { any } = require("webidl-conversions");
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //the middlewares should be declared before the matters since the order matters

const db = require("./connections");

const trainingsRouter = require("./routes/trainings");
app.use("/trainings", trainingsRouter);

const membersRouter = require("./routes/members");
app.use("/members", membersRouter);

const newsRouter = require("./routes/news");
app.use("/news", newsRouter);

const projectsRouter = require("./routes/projects");
app.use("/projects", projectsRouter);

const eventsRouter = require('./routes/events')
app.use('/events', eventsRouter);

//handle all unspecified routes to this server
app.all('*', (req, res)=> {
    res.status(404).send('Requested resource not found!')
})

app.listen(8080, ()=>{
    console.log("Listening on port 8080")
})


