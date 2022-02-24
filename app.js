const bAdd = document.getElementById("bAdd");
const itTask = document.getElementById("itTask");
const form = document.getElementById("form");
const taskContainer = document.getElementById("tasks");
const taskName = document.getElementById("taskName");
const tasks = [];
let time = 0;
let timer = null;
let timeBreal = null;
let currentTask = null;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (itTask.value === "") return;

  createTask(itTask.value);
  itTask.value = "";
  renderTasks();
});

const createTask = (value) => {
  const newTask = {
    id: crypto.randomUUID(),
    title: value,
    completed: false,
  };
  tasks.unshift(newTask);
};

const renderTasks = () => {
  const html = tasks.map(
    (task) =>
      ` 
        <div class="task">
            <div class="completed">
              ${
                task.completed
                  ? `<span class="done">Hecha</span>`
                  : `<button class="start-btn" data-id="${task.id}">Iniciar</button>`
              }
            </div>
            <div class="title">
                ${task.title}
            </div>  
        </div>
      `
  );
  taskContainer.innerHTML = html.join("");
};

taskContainer.addEventListener("click", ({ target }) => {
  const button = target;
  if (!button.classList.contains("start-btn")) return;
  if (!timer) {
    const id = button.getAttribute("data-id");
    startButtonHandler(id);
    button.textContent = "En progreso...";
  }
});

const startButtonHandler = (id) => {
  time = 25 * 60;
  currentTask = id;
  const taskIndex = tasks.findIndex((task) => task.id === id);
  taskName.textContent = tasks[taskIndex].title;
  renderTime();
  timer = setInterval(() => {
    timerHandler(id);
  }, 1000);
};

const timerHandler = (id) => {
  time--;
  renderTime();

  if (time === 0) {
    clearInterval(timer);
    markCompleted(id);
    timer = null;
    renderTasks();
    startBreak();
  }
};

const startBreak = () => {
  time = 5 * 60;
  taskName.textContent = "Break";
  renderTime();
  timerBreak = setInterval(() => {
    timerBreakHandler();
  }, 1000);
};

const timerBreakHandler = () => {
  time--;
  renderTime();

  if (time === 0) {
    clearInterval(timerBreak);
    currentTask = null;
    timerBreak = null;
    taskName.textContent = "";
    renderTasks();
  }
};

const renderTime = () => {
  const timeDiv = document.getElementById("value");
  const minutes = parseInt(time / 60);
  const seconds = parseInt(time % 60);

  timeDiv.textContent = `${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
};

const markCompleted = (id) => {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  tasks[taskIndex].completed = true;
};

renderTime();
renderTasks();
