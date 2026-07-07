import { Link } from "react-router-dom";

const features = [
  {
    title: "Add tasks",
    description: "Capture ideas and to-dos the moment they come to mind.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.75}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    ),
  },
  {
    title: "Mark as completed",
    description: "Check off finished work and watch your progress grow.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.75}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    ),
  },
  {
    title: "Delete tasks",
    description: "Remove items you no longer need with a single click.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.75}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
        />
      </svg>
    ),
  },
  {
    title: "Organize daily work",
    description: "Keep your day focused with a clear, simple task list.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.75}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 6.75h12M8.25 12h12m-12 5.25h12"
        />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100">
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-10 sm:px-10 lg:px-12">
        {/* HERO */}
        <main className="flex flex-1 flex-col items-center justify-center py-16 text-center lg:py-24">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-200">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Your personal task manager
          </p>

          <h1 className="text-white text-4xl font-bold">Welcome to TaskFlow</h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl">
            A clean, lightweight todo app to help you plan your day, stay on
            track, and finish what matters most - without the clutter.
          </p>

          <Link
            to="/tasks"
            className="group mt-10 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-xl"
          >
            Get Started
          </Link>
        </main>

        <section className="pb-8">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">
              Everything you need
            </h2>
            <p className="mt-2 text-slate-400">
              Simple tools to manage your daily tasks effectively.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(function (feature) {
              return (
                <article
                  key={feature.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left"
                >
                  <div className="mb-4 text-violet-300">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-400">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
