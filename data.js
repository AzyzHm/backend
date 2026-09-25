// data.js — nos données, en mémoire pour l'instant
export let tasks = [
  { id: "1", title: "Apprendre Node.js", done: false },
  { id: "2", title: "Apprendre Express", done: false },
];

export function getAllTasks() {
  return tasks;
}

export function getTaskById(id) {
  return tasks.find((task) => task.id === id);
}

export function createTask(data) {
  const newTask = { id: String(tasks.length + 1), done: false, ...data };
  tasks.push(newTask);
  return newTask;
}

export function updateTask(id, data) {
  const task = getTaskById(id);
  if (!task) return null;
  Object.assign(task, data);
  return task;
}

export function deleteTask(id) {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
}
