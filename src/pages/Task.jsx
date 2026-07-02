import { useEffect, useState } from "react";
import { ClipboardList, Plus, Pencil, Trash2, Check } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../redux/actions/taskActions";

function Task() {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);

  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const resetForm = () => {
    setDescription("");
    setDate("");
    setTime("");
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description || !date || !time) return;

    const payload = { description, date, time };
    const result = editingId
      ? await dispatch(updateTask(editingId, payload))
      : await dispatch(createTask(payload));

    if (result.success) {
      resetForm();
    }
  };

  const handleToggleComplete = (task) => {
    dispatch(updateTask(task.id, { completed: !task.completed }));
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleEdit = (task) => {
    setDescription(task.description);
    setDate(task.date);
    setTime(task.time);
    setEditingId(task.id);
  };

  return (
    <div className="bg-slate-950 min-h-screen py-4">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center gap-5 mb-4">
          <div className="bg-slate-900 p-4 rounded-3xl">
            <ClipboardList className="text-white" size={20} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white text-slate-900">
              Your Tasks
            </h1>
          </div>
        </div>

        {/* Add Task Card */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-md p-8">
          {error && (
            <p className="mb-4 rounded-md bg-red-500/10 px-3 py-2 text-sm text-red-500">
              {error}
            </p>
          )}

          {/* Description */}
          <label className="block  font-semibold mb-2">Description</label>

          <textarea
            placeholder="What needs to be done?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-20 border border-gray-200 rounded-2xl p-4  outline-none resize-none focus:ring-2 focus:ring-slate-800"
          ></textarea>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div>
              <label className="block  font-semibold mb-3">Date</label>

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border border-gray-200 rounded-2xl p-2  shadow-sm"
              />
            </div>

            <div>
              <label className="block  font-semibold mb-3">Time</label>

              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full border border-gray-200 rounded-2xl p-2  shadow-sm"
              />
            </div>
          </div>

          {/* Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="mt-8 flex items-center gap-3 bg-slate-900 text-white px-4 py-4 rounded-2xl  font-semibold hover:bg-slate-800 transition disabled:opacity-60"
            >
              <Plus size={20} />
              {editingId ? "Update task" : "Add task"}
            </button>

            {editingId && (
              <button
                onClick={resetForm}
                className="mt-8 px-4 py-4 rounded-2xl font-semibold text-gray-600 hover:text-gray-900 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Task List */}
        {tasks.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-200 shadow-md mt-14 p-24 text-center">
            <p className=" text-gray-500">
              No tasks yet. Add your first one above.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 mt-8">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white rounded-3xl border border-gray-200 shadow-md p-6 flex items-center justify-between gap-4"
              >
                <div className="min-w-0">
                  <p
                    className={`font-semibold break-words ${
                      task.completed ? "line-through text-gray-400" : "text-slate-900"
                    }`}
                  >
                    {task.description}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {task.date} &middot; {task.time}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleToggleComplete(task)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl font-semibold transition ${
                      task.completed
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <Check size={16} />
                    Completed
                  </button>

                  <button
                    onClick={() => handleEdit(task)}
                    className="p-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    onClick={() => handleDelete(task.id)}
                    className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Task;
