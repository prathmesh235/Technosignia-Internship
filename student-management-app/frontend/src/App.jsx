import { useEffect, useMemo, useState } from "react";
import StudentForm from "./components/StudentForm.jsx";
import StudentTable from "./components/StudentTable.jsx";
import { getStudents, createStudent, updateStudent, deleteStudent } from "./api.js";

export default function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [editing, setEditing] = useState(null); // student being edited, or null
  const [query, setQuery] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      setStudents(await getStudents());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  function flash(msg) {
    setNotice(msg);
    setTimeout(() => setNotice(""), 3000);
  }

  // Returns normally on success; throws so the form can show field errors.
  async function handleSave(data) {
    if (editing) {
      await updateStudent(editing.id, data);
      flash("Changes saved");
    } else {
      await createStudent(data);
      flash("Student added");
    }
    setEditing(null);
    await load();
  }

  async function handleDelete(student) {
    if (!window.confirm(`Delete ${student.name}? This cannot be undone.`)) return;
    try {
      await deleteStudent(student.id);
      if (editing?.id === student.id) setEditing(null);
      flash("Student deleted");
      await load();
    } catch (e) {
      setError(e.message);
    }
  }

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return students;
    return students.filter((s) =>
      [s.name, s.email, s.course].some((v) => (v || "").toLowerCase().includes(q))
    );
  }, [students, query]);

  return (
    <main className="page">
      <header className="masthead">
        <h1>Student register</h1>
        <p className="count">{students.length} enrolled</p>
      </header>

      {notice && <div className="banner ok" role="status">{notice}</div>}
      {error && (
        <div className="banner bad" role="alert">
          {error} <button className="link" onClick={load}>Try again</button>
        </div>
      )}

      <div className="layout">
        <section className="panel">
          <h2>{editing ? `Edit ${editing.name}` : "Add a student"}</h2>
          <StudentForm
            key={editing?.id ?? "new"}
            initial={editing}
            onSave={handleSave}
            onCancel={() => setEditing(null)}
          />
        </section>

        <section className="panel wide">
          <div className="panel-head">
            <h2>Students</h2>
            <input
              type="search"
              placeholder="Search name, email or course"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search students"
            />
          </div>
          {loading ? (
            <p className="muted">Loading students…</p>
          ) : (
            <StudentTable
              students={visible}
              total={students.length}
              onEdit={setEditing}
              onDelete={handleDelete}
              activeId={editing?.id}
            />
          )}
        </section>
      </div>
    </main>
  );
}