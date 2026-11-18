export default function StudentTable({ students, total, onEdit, onDelete, activeId }) {
  if (total === 0) {
    return <p className="muted">No students yet. Add the first one using the form.</p>;
  }
  if (students.length === 0) {
    return <p className="muted">No students match your search.</p>;
  }
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Age</th><th>Course</th><th><span className="sr">Actions</span></th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id} className={s.id === activeId ? "active" : ""}>
              <td className="num">{s.id}</td>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td className="num">{s.age}</td>
              <td>{s.course || "—"}</td>
              <td className="row-actions">
                <button className="link" onClick={() => onEdit(s)}>Edit</button>
                <button className="link danger" onClick={() => onDelete(s)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}