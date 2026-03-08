// server/index.ts
// This Express server is fully wired up and working.
// The four core routes are implemented — run it and the frontend will connect straight away.
//
// TODO: This is where you can get creative!
//   - Add a priority field to tasks (low / medium / high)
//   - Add filtering: GET /api/tasks?priority=high or ?completed=true
//   - Add input validation and better error messages
//   - Anything else you think would make this better!

import express, { Request, Response } from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// ─── Types ────────────────────────────────────────────────────────────────────

type Priority = "low" | "medium" | "high";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  priority?: Priority;
}

// ─── In-memory store ──────────────────────────────────────────────────────────

let tasks: Task[] = [];

// ─── Routes ───────────────────────────────────────────────────────────────────

// GET /api/tasks — return all tasks
app.get("/api/tasks", (req: Request, res: Response) => {
  const { completed, priority } = req.query;
  const validPriorityArray: Priority[] = ["low", "medium", "high"];
  const validCompletedArray: (string | undefined)[] = [
    "true",
    "false",
    undefined,
  ];
  let booleanCompleted: boolean | undefined = undefined;
  let priorityQuery: Priority | undefined = undefined;
  if (priority === "low") {
    priorityQuery = "low";
  } else if (priority === "medium") {
    priorityQuery = "medium";
  } else if (priority === "high") {
    priorityQuery = "high";
  } else if (priority === undefined) {
    priorityQuery = undefined;
  } else if (priority !== undefined && !validPriorityArray.includes(priority)) {
    res.status(400).json({ error: "priority must be high, medium, or low" });
    return;
  }
  if (completed === "true") {
    booleanCompleted = true;
  } else if (completed === "false") {
    booleanCompleted = false;
  } else if (completed === undefined) {
    booleanCompleted = undefined;
  } else if (
    completed !== undefined &&
    !validCompletedArray.includes(completed)
  ) {
    res.status(400).json({ error: "completed must be either true or false" });
    return;
  }
  if (booleanCompleted === undefined && priorityQuery === undefined) {
    res.json(tasks);
    return;
  } else if (booleanCompleted !== undefined && priorityQuery === undefined) {
    const filteredTasks: Task[] = tasks.filter((task) => {
      return task.completed === booleanCompleted;
    });
    res.json(filteredTasks);
  } else if (booleanCompleted === undefined && priorityQuery !== undefined) {
    const filteredTasks: Task[] = tasks.filter((task) => {
      return task.priority === priorityQuery;
    });
    res.json(filteredTasks);
  } else if (booleanCompleted !== undefined && priorityQuery !== undefined) {
    const filteredTasks: Task[] = tasks.filter((task) => {
      return (
        task.completed === booleanCompleted && task.priority === priorityQuery
      );
    });
    res.json(filteredTasks);
  }
});

// POST /api/tasks — create a new task
app.post("/api/tasks", (req: Request, res: Response) => {
  const { title, priority } = req.body as {
    title?: string;
    priority?: Priority;
  };

  if (!title || typeof title !== "string" || title.trim() === "") {
    res
      .status(400)
      .json({ error: "title is required and must be a non-empty string" });
    return;
  }

  const newTask: Task = {
    id: uuidv4(),
    title: title.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
    ...(priority && { priority }),
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PATCH /api/tasks/:id — update a task
app.patch("/api/tasks/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    res.status(404).json({ error: `Task with id "${id}" not found` });
    return;
  }

  const updates = req.body as Partial<Omit<Task, "id" | "createdAt">>;
  tasks[index] = { ...tasks[index], ...updates };
  res.json(tasks[index]);
});

// DELETE /api/tasks/:id — delete a task
app.delete("/api/tasks/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    res.status(404).json({ error: `Task with id "${id}" not found` });
    return;
  }

  tasks = tasks.filter((t) => t.id !== id);
  res.status(204).send();
});

// ─── Start ────────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
