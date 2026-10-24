// ---------- State ----------
let students = [
  { id: 1, name: "Asha",  marks: 82 },
  { id: 2, name: "Ravi",  marks: 45 },
  { id: 3, name: "Meena", marks: 91 }
];
let nextId = 4;
let currentFilter = "all";
let searchTerm = "";

// ---------- DOM references ----------
const form        = document.getElementById("studentForm");
const nameInput   = document.getElementById("nameInput");
const marksInput  = document.getElementById("marksInput");
const formMsg     = document.getElementById("formMsg");
const searchInput = document.getElementById("searchInput");
const listEl      = document.getElementById("list");
const statsEl     = document.getElementById("stats");
const statusEl    = document.getElementById("status");
const loadBtn     = document.getElementById("loadBtn");
const sortBtn     = document.getElementById("sortBtn");
const themeBtn    = document.getElementById("themeBtn");

// Escape text so user-typed names cannot inject HTML
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// ---------- Render (dynamic data) ----------
function getVisibleStudents() {
  return students
    .filter(({ name }) => name.toLowerCase().includes(searchTerm))
    .filter(({ marks }) => {
      if (currentFilter === "pass") return marks >= 50;
      if (currentFilter === "fail") return marks < 50;
      return true;
    });
}

function render() {
  const visible = getVisibleStudents();

  listEl.innerHTML = visible.map(({ id, name, marks }) => `
    <div class="card ${marks < 50 ? "fail" : ""}">
      <h3>${escapeHtml(name)}</h3>
      <p>Marks: ${marks}</p>
      <p>${marks >= 50 ? "Pass" : "Fail"}</p>
      <button class="delete" data-id="${id}">Delete</button>
    </div>`).join("");

  if (visible.length === 0) {
    listEl.innerHTML = "<p>No students found.</p>";
  }
  updateStats(visible);
}

// ---------- Statistics using reduce, map ----------
function updateStats(list) {
  if (list.length === 0) { statsEl.textContent = "Showing 0 students"; return; }
  const total   = list.reduce((sum, s) => sum + s.marks, 0);
  const average = (total / list.length).toFixed(1);
  const highest = Math.max(...list.map(s => s.marks));
  statsEl.textContent =
    `Showing ${list.length} of ${students.length} | Average: ${average} | Highest: ${highest}`;
}

// ---------- Form submission event ----------
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name  = nameInput.value.trim();
  const marks = Number(marksInput.value);

  if (name === "" || marks < 0 || marks > 100) {
    formMsg.textContent = "Please enter a valid name and marks (0-100).";
    formMsg.className = "error";
    return;
  }
  students = [...students, { id: nextId++, name, marks }];   // spread
  formMsg.textContent = `${name} added successfully.`;
  formMsg.className = "success";
  form.reset();
  render();
});

// ---------- Search (input event) ----------
searchInput.addEventListener("input", (e) => {
  searchTerm = e.target.value.toLowerCase().trim();
  render();
});

// ---------- Filter buttons (click events) ----------
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn")
            .forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    render();
  });
});

// ---------- Sort button ----------
sortBtn.addEventListener("click", () => {
  students = [...students].sort((a, b) => b.marks - a.marks);
  render();
});

// ---------- Delete (event delegation) ----------
listEl.addEventListener("click", (e) => {
  if (e.target.matches(".delete")) {
    const id = Number(e.target.dataset.id);
    students = students.filter(s => s.id !== id);
    render();
  }
});

// ---------- Theme toggle ----------
themeBtn.addEventListener("click", () => document.body.classList.toggle("dark"));

// ---------- Async: fetch from API ----------
async function loadFromApi() {
  statusEl.textContent = "Loading...";
  statusEl.className = "";
  loadBtn.disabled = true;
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    const users = await response.json();

    // Convert API data into our student format
    const apiStudents = users.map(({ id, name }) => ({
      id: 1000 + id,
      name,
      marks: Math.floor(Math.random() * 51) + 50   // random 50-100
    }));

    students = [...students, ...apiStudents];
    statusEl.textContent = `Loaded ${apiStudents.length} students from API.`;
    statusEl.className = "success";
    render();
  } catch (error) {
    statusEl.textContent = `Could not load data: ${error.message}`;
    statusEl.className = "error";
  } finally {
    loadBtn.disabled = false;
  }
}
loadBtn.addEventListener("click", loadFromApi);

// ---------- First render ----------
render();