import React from "react";
import { ClipboardList, Plus } from "lucide-react";

function Task() {
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
          {/* Description */}
          <label className="block  font-semibold mb-2">Description</label>

          <textarea
            placeholder="What needs to be done?"
            className="w-full h-20 border border-gray-200 rounded-2xl p-4  outline-none resize-none focus:ring-2 focus:ring-slate-800"
          ></textarea>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div>
              <label className="block  font-semibold mb-3">Date</label>

              <input
                type="date"
                className="w-full border border-gray-200 rounded-2xl p-2  shadow-sm"
              />
            </div>

            <div>
              <label className="block  font-semibold mb-3">Time</label>

              <input
                type="time"
                className="w-full border border-gray-200 rounded-2xl p-2  shadow-sm"
              />
            </div>
          </div>

          {/* Button */}
          <button className="mt-8 flex items-center gap-3 bg-slate-900 text-white px-4 py-4 rounded-2xl  font-semibold hover:bg-slate-800 transition">
            <Plus size={20} />
            Add task
          </button>
        </div>

        {/* Empty Task Card */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-md mt-14 p-24 text-center">
          <p className=" text-gray-500">
            No tasks yet. Add your first one above.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Task;
