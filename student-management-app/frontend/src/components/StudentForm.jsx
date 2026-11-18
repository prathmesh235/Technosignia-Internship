import { useState } from "react";

const EMPTY = { name: "", email: "", age: "", course: "" };

export default function StudentForm({ initial, onSave, onCancel }) {
  const [values, setValues] = useState(
    initial ? { ...EMPTY, ...initial, age: String(initial.age ?? "") } : EMPTY
  );
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  const change = (field) => (e) => setValues({ ...values, [field]: e.target.value });

  // Quick client-side checks; the server validates again.
  function validate() {
    const e = {};
    if (!values.name.trim()) e.name = "Name is required";
    if (!values.email.trim()) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(values.email)) e.email = "Enter a valid email";
    const age = Number(values.age);
    if (values.age === "") e.age = "Age is required";
    else if (!Number.isInteger(age) || age < 1 || age > 120) e.age = "Age must be between 1 and 120";
    return e;
  }

  async function submit(ev) {
    ev.preventDefault();
    setFormError("");
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length) return;

    setSaving(true);
    try {
      await onSave({
        name: values.name.trim(),
        email: values.email.trim(),
        age: Number(values.age),
        course: values.course.trim(),
      });
      if (!initial) setValues(EMPTY);
    } catch (err) {
      setErrors(err.fieldErrors || {});          // field messages from the server (400)
      if (!Object.keys(err.fieldErrors || {}).length) setFormError(err.message); // e.g. 409
    } finally {
      setSaving(false);
    }
  }

  const field = (name, label, props = {}) => (
    <label className="field">
      <span>{label}</span>
      <input
        value={values[name]}
        onChange={change(name)}
        aria-invalid={!!errors[name]}
        {...props}
      />
      {errors[name] && <em className="err">{errors[name]}</em>}
    </label>
  );

  return (
    <form onSubmit={submit} noValidate>
      {field("name", "Full name", { autoComplete: "off" })}
      {field("email", "Email", { type: "email", autoComplete: "off" })}
      {field("age", "Age", { type: "number", min: 1, max: 120 })}
      {field("course", "Course", { placeholder: "Optional" })}
      {formError && <p className="err" role="alert">{formError}</p>}
      <div className="actions">
        <button className="primary" disabled={saving}>
          {saving ? "Saving…" : initial ? "Save changes" : "Add student"}
        </button>
        {initial && (
          <button type="button" className="ghost" onClick={onCancel}>Cancel</button>
        )}
      </div>
    </form>
  );
}