import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./Home.css";
import { useNavigate } from "react-router-dom";

function Modal({ children, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {children}
        <button
          type="button"
          className="modal-close-button"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
      </div>
    </div>
  );
}

function Home() {
  const [userName, setUserName] = useState("User");
  const [students, setStudents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    gender: "",
    education: "",
    course: "",
    password: "",
  });
  const [detailStudent, setDetailStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem("userName") || "User";
    setUserName(name);
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await fetch("http://localhost:8081/");
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      alert("Error fetching data");
    }
  };

  const handleEditClick = (student) => {
    setEditingId(student.id);
    setEditForm(student);
    setDetailStudent(null);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure to delete this student?")) {
      try {
        console.log("inside deletehandle.");
        const res = await fetch(`http://localhost:8081/students/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          alert("Deleted successfully");
          fetchStudents();
          if (detailStudent?.id === id) setDetailStudent(null);
        }
      } catch {
        alert("Delete failed");
      }
    }
  };

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8081/students/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      if (res.ok) {
        alert("Updated successfully");
        setEditingId(null);
        fetchStudents();
      }
    } catch {
      alert("Update failed");
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("userName");
    alert("Logged out!");
    navigate("/login");
  };

  return (
    <>
      <Navbar userName={userName} onLogout={handleLogout} />
      <div className="page-center-wrapper">
        <div className="home-container">
          <h1 className="home-title">Students List</h1>
          {students.length === 0 ? (
            <p>No students found.</p>
          ) : (
            <>
              <table
                border="1"
                cellPadding="10"
                cellSpacing="0"
                style={{ width: "100%", borderCollapse: "collapse" }}
              >
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Education</th>
                    <th>Course</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) =>
                    editingId === student.id ? (
                      <tr key={student.id}>
                        <td>
                          <input
                            name="name"
                            value={editForm.name}
                            onChange={handleChange}
                            required
                          />
                        </td>
                        <td>
                          <input
                            name="education"
                            value={editForm.education}
                            onChange={handleChange}
                            required
                          />
                        </td>
                        <td>
                          <input
                            name="course"
                            value={editForm.course}
                            onChange={handleChange}
                            required
                          />
                        </td>
                        <td>
                          <button className="save" onClick={handleEditSubmit}>
                            Save
                          </button>
                          <button
                            className="cancel"
                            onClick={() => setEditingId(null)}
                          >
                            Cancel
                          </button>
                        </td>
                      </tr>
                    ) : (
                      <tr key={student.id}>
                        <td>{student.name}</td>
                        <td>{student.education}</td>
                        <td>{student.course}</td>
                        <td>
                          <button
                            className="edit"
                            onClick={() => handleEditClick(student)}
                          >
                            Edit
                          </button>{" "}
                          <button
                            className="delete"
                            onClick={() => handleDeleteClick(student.id)}
                          >
                            Delete
                          </button>{" "}
                          <button
                            className="details"
                            onClick={() => setDetailStudent(student)}
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>

              {detailStudent && (
                <Modal onClose={() => setDetailStudent(null)}>
                  <h3>Student Details</h3>
                  <p>
                    <strong>Name:</strong> {detailStudent.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {detailStudent.email}
                  </p>
                  <p>
                    <strong>Gender:</strong> {detailStudent.gender}
                  </p>
                  <p>
                    <strong>Education:</strong> {detailStudent.education}
                  </p>
                  <p>
                    <strong>Course:</strong> {detailStudent.course}
                  </p>
                </Modal>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
