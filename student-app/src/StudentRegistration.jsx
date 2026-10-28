import { useState } from "react";

const COURSES = ["Web Development", "Data Science", "UI/UX Design", "Cyber Security"];

const initialValues = { name: "", email: "", course: "" };

// Pure validation function: takes form values, returns an errors object
function validate({ name, email, course }) {
  const errors = {};
  if (!name.trim()) errors.name = "Enter the student's full name.";
  else if (name.trim().length < 3) errors.name = "Name must be at least 3 characters.";

  if (!email.trim()) errors.email = "Enter an email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email, like name@example.com.";

  if (!course) errors.course = "Choose a course.";
  return errors;
}

// Reusable child component: receives data through props
function Field({ label, id, error, children }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {children}
      {error && <p className="error" role="alert">{error}</p>}
    </div>
  );
}

// Child component to display a submitted student (props in action)
function StudentCard({ student, index }) {
  return (
    <li className="card">
      <span className="badge">{index + 1}</span>
      <div>
        <strong>{student.name}</strong>
        <div>{student.email}</div>
        <div className="muted">{student.course}</div>
      </div>
    </li>
  );
}

export default function StudentRegistration() {
  const [values, setValues] = useState(initialValues); // controlled inputs
  const [errors, setErrors] = useState({});            // validation messages
  const [touched, setTouched] = useState({});          // which fields were visited
  const [students, setStudents] = useState([]);        // submitted students
  const [success, setSuccess] = useState("");          // success banner

  // One handler for every input: updates the field and re-validates live
  const handleChange = (e) => {
    const { name, value } = e.target;
    const next = { ...values, [name]: value };
    setValues(next);
    setSuccess("");
    if (touched[name]) setErrors(validate(next));
  };

  // Show an error only after the user leaves a field
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    setErrors(validate(values));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched({ name: true, email: true, course: true });
    if (Object.keys(found).length > 0) return; // stop if invalid

    setStudents([...students, { ...values, name: values.name.trim() }]);
    setSuccess(`${values.name.trim()} is registered for ${values.course}.`);
    setValues(initialValues);
    setTouched({});
    setErrors({});
  };

  const show = (field) => (touched[field] ? errors[field] : "");

  return (
    <div className="page">
      <style>{css}</style>

      <main className="layout">
        <section className="panel">
          <h1>Student registration</h1>
          <p className="muted">Fill in the details below to enrol a student.</p>

          {/* Conditional rendering: banner appears only after a successful submit */}
          {success && <div className="success" role="status">{success}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <Field label="Full name" id="name" error={show("name")}>
              <input
                id="name" name="name" type="text" placeholder="Aarav Sharma"
                value={values.name} onChange={handleChange} onBlur={handleBlur}
                className={show("name") ? "invalid" : ""}
              />
            </Field>

            <Field label="Email" id="email" error={show("email")}>
              <input
                id="email" name="email" type="email" placeholder="aarav@example.com"
                value={values.email} onChange={handleChange} onBlur={handleBlur}
                className={show("email") ? "invalid" : ""}
              />
            </Field>

            <Field label="Course" id="course" error={show("course")}>
              <select
                id="course" name="course"
                value={values.course} onChange={handleChange} onBlur={handleBlur}
                className={show("course") ? "invalid" : ""}
              >
                <option value="">Select a course</option>
                {COURSES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>

            <button type="submit">Register student</button>
          </form>
        </section>

        <section className="panel">
          <h2>Registered students ({students.length})</h2>
          {/* Conditional rendering: empty state vs. list */}
          {students.length === 0 ? (
            <p className="muted">No students yet. Submit the form and they will appear here.</p>
          ) : (
            <ul className="list">
              {students.map((s, i) => <StudentCard key={i} student={s} index={i} />)}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

const css = `
  .page { min-height: 100vh; background: #eef2f6; padding: 32px 16px; font-family: system-ui, sans-serif; color: #1c2733; }
  .layout { max-width: 880px; margin: 0 auto; display: grid; gap: 20px; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); align-items: start; }
  .panel { background: #fff; border-radius: 12px; padding: 24px; border: 1px solid #d7dee6; }
  h1 { font-size: 24px; margin: 0 0 4px; }
  h2 { font-size: 18px; margin: 0 0 12px; }
  .muted { color: #5b6b7b; font-size: 14px; margin: 0 0 16px; }
  .field { margin-bottom: 16px; }
  label { display: block; font-size: 14px; font-weight: 600; margin-bottom: 6px; }
  input, select { width: 100%; box-sizing: border-box; padding: 10px 12px; font-size: 15px; border: 1px solid #b8c4d0; border-radius: 8px; background: #fff; }
  input:focus, select:focus, button:focus-visible { outline: 3px solid #9cc4f5; outline-offset: 1px; }
  .invalid { border-color: #c0392b; }
  .error { color: #c0392b; font-size: 13px; margin: 6px 0 0; }
  button { width: 100%; padding: 11px; font-size: 15px; font-weight: 600; color: #fff; background: #1f5fa8; border: 0; border-radius: 8px; cursor: pointer; }
  button:hover { background: #174b87; }
  .success { background: #e3f4e8; color: #1e6b3a; padding: 10px 12px; border-radius: 8px; margin-bottom: 16px; font-size: 14px; }
  .list { list-style: none; padding: 0; margin: 0; display: grid; gap: 10px; }
  .card { display: flex; gap: 12px; padding: 12px; border: 1px solid #d7dee6; border-radius: 8px; font-size: 14px; }
  .card .muted { margin: 2px 0 0; }
  .badge { flex: none; width: 28px; height: 28px; border-radius: 50%; background: #1f5fa8; color: #fff; display: grid; place-items: center; font-size: 13px; font-weight: 600; }
`;