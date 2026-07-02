import React from "react";

export default function About() {
  return (
    <div className=" bg-slate-950 text-slate-100 flex items-center justify-center px-6">
      <div className="my-10 max-w-2xl w-full bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-12 shadow-xl ">
        {/* Header */}
        <h1 className="text-3xl sm:text-4xl font-bold text-white text-center">
          About This App
        </h1>

        {/* Divider */}
        <div className="w-24 h-1 bg-violet-500 mx-auto mt-4 rounded-full"></div>

        {/* Description */}
        <p className="mt-8 text-slate-300 text-base sm:text-lg leading-relaxed text-center">
          This{" "}
          <span className="text-violet-400 font-semibold">
            To-Do application
          </span>{" "}
          is designed to help users organize their daily activities efficiently.
          Users can create tasks, mark them as completed, and remove tasks when
          they are no longer needed.
        </p>

        {/* Features Box */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5">
            <h3 className="text-violet-400 font-semibold text-lg">
              Task Management
            </h3>
            <p className="text-slate-400 mt-2 text-sm">
              Easily add, organize, and manage your daily tasks in one place.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5">
            <h3 className="text-violet-400 font-semibold text-lg">
              Productivity Focus
            </h3>
            <p className="text-slate-400 mt-2 text-sm">
              Stay focused on what matters by tracking completed and pending
              tasks.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5">
            <h3 className="text-violet-400 font-semibold text-lg">
              Simple Interface
            </h3>
            <p className="text-slate-400 mt-2 text-sm">
              Clean and minimal design for distraction-free task management.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5">
            <h3 className="text-violet-400 font-semibold text-lg">
              Fast & Lightweight
            </h3>
            <p className="text-slate-400 mt-2 text-sm">
              Built with React for smooth and fast performance.
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <p className="mt-10 text-center text-slate-500 text-sm">
          Built with React + Tailwind CSS
        </p>
      </div>
    </div>
  );
}
