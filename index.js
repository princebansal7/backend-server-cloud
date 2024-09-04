import express from "express";
import dotenv from "dotenv";
import cors from "cors";
const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

app.use(cors());

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateTodos() {
    const todos = [];
    const todoCount = getRandomInt(1, 20);

    for (let i = 0; i < todoCount; i++) {
        todos.push({
            id: i + 1,
            title: `Todo Title ${i + 1}`,
            description: `Description for todo ${i + 1}`,
            completed: false,
        });
    }

    return todos;
}

app.get("/", (req, res) => {
    res.send(`
        <div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
            <h1>Welcome to Prince Bansal's Server!</h1>
        </div>
    `);
});

app.get("/todos", (req, res) => {
    // console.log("all todos ep hit");
    const todos = generateTodos();
    res.json({ todos: todos });
});

// Accessed via: /todo/1
// ID is extracted from the URL path using req.params.id

app.get("/todo/:id", (req, res) => {
    // console.log("todos ep with id hit");
    const id = parseInt(req.params.id);
    const todos = generateTodos();
    const todo = todos.find(t => t.id === id);

    if (todo) {
        res.json(todo);
    } else {
        res.status(404).send({
            error: "todo with id from 1 to 20 gets generated randomly, passed id is not in range",
        });
    }
});

app.get("/sum", function (req, res) {
    const a = req.query.a;
    const b = req.query.b;
    const sum = parseInt(a) + parseInt(b);
    res.json({
        sum: sum,
    });
});

app.get("/si", function (req, res) {
    const principle = parseInt(req.query.p);
    const rate = parseInt(req.query.r);
    const time = parseInt(req.query.t);
    const simpleInterest = (principle * rate * time) / 100;
    const totalAmount = principle + simpleInterest;
    res.json({
        simpleInterest,
        totalAmount,
    });
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
