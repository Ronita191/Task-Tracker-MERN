import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  //const API = "http://localhost:5000/api/tasks";//
  const API = import.meta.env.VITE_API_URL;

  // GET TASKS
  const fetchTasks = async () => {
    const res = await axios.get(API);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ADD TASK
  const addTask = async () => {
    if (!title) return alert("Title required");

    await axios.post(API, {
      title,
      description,
    });

    setTitle("");
    setDescription("");
    fetchTasks();
  };

  // DELETE TASK
  const deleteTask = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchTasks();
  };

  // UPDATE TASK (toggle complete)
  const toggleTask = async (task) => {
    await axios.put(`${API}/${task._id}`, {
      completed: !task.completed,
    });
    fetchTasks();
  };

  return (
  <div style={styles.container}>
    <h1 style={styles.heading}>Task Tracker</h1>

    <div style={styles.form}>
      <input
        style={styles.input}
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        style={styles.input}
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button style={styles.addBtn} onClick={addTask}>
        Add Task
      </button>
    </div>

    <div>
      {tasks.map((task) => (
        <div key={task._id} style={styles.card}>
          <h3 style={{ textDecoration: task.completed ? "line-through" : "none" }}>
            {task.title}
          </h3>

          <p>{task.description}</p>

          <button style={styles.completeBtn} onClick={() => toggleTask(task)}>
            {task.completed ? "Undo" : "Complete"}
          </button>

          <button
            style={styles.deleteBtn}
            onClick={() => deleteTask(task._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  </div>
);
}

export default App;

const styles = {
  container: {
    maxWidth: "600px",
    margin: "auto",
    fontFamily: "Arial",
    padding: "20px",
  },

  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
  },

  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },

  addBtn: {
    padding: "10px",
    background: "green",
    color: "white",
    border: "none",
    cursor: "pointer",
  },

  card: {
    border: "1px solid #ddd",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
  },

  completeBtn: {
    marginRight: "10px",
    padding: "5px",
  },

  deleteBtn: {
    padding: "5px",
    background: "red",
    color: "white",
    border: "none",
  },
};