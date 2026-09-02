import { useForm, router } from '@inertiajs/react';

export default function Index({ tasks }) {
    const { data, setData, post, reset, processing } = useForm({
        title: '',
    });

    function addTask(e) {
        e.preventDefault();
        post('/tasks', {
            onSuccess: () => reset('title'),
        });
    }

    const done = tasks.filter((t) => t.is_done).length;

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center px-4 py-16">

            {/* header — semantic landmark for the page title */}
            <header className="w-full max-w-lg mb-10">
                <h1 className="text-3xl font-semibold tracking-tight text-white">
                    Tasks
                </h1>
                {tasks.length > 0 && (
                    <p className="mt-1 text-sm text-zinc-500">
                        {done} of {tasks.length} completed
                    </p>
                )}
            </header>

            {/* main — primary content of the page */}
            <main className="w-full max-w-lg flex flex-col gap-8">

                {/* section — the task input area */}
                <section aria-label="Add a new task">
                    <form onSubmit={addTask} className="flex gap-2">
                        <label htmlFor="task-input" className="sr-only">
                            New task title
                        </label>
                        <input
                            id="task-input"
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="What needs doing?"
                            className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5
                                       text-sm text-zinc-100 placeholder-zinc-600
                                       focus:outline-none focus:ring-1 focus:ring-zinc-600
                                       transition"
                        />
                        <button
                            type="submit"
                            disabled={processing || !data.title.trim()}
                            className="px-4 py-2.5 bg-white text-zinc-900 text-sm font-medium rounded-lg
                                       hover:bg-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed
                                       transition"
                        >
                            Add
                        </button>
                    </form>
                </section>

                {/* section — the task list area */}
                <section aria-label="Task list">
                    <ul className="space-y-2">
                        {tasks.length === 0 && (
                            <li className="text-center text-zinc-600 text-sm py-12">
                                No tasks yet — add one above.
                            </li>
                        )}

                        {tasks.map((task) => (
                            <li
                                key={task.id}
                                className="group flex items-center gap-3 bg-zinc-900 border border-zinc-800
                                           rounded-lg px-4 py-3 transition hover:border-zinc-700"
                            >
                                <input
                                    type="checkbox"
                                    id={`task-${task.id}`}
                                    checked={task.is_done}
                                    onChange={(e) =>
                                        router.patch(`/tasks/${task.id}`, {
                                            is_done: e.target.checked,
                                        })
                                    }
                                    className="w-4 h-4 rounded accent-white cursor-pointer shrink-0"
                                />

                                <label
                                    htmlFor={`task-${task.id}`}
                                    className={`flex-1 text-sm cursor-pointer transition ${
                                        task.is_done
                                            ? 'line-through text-zinc-600'
                                            : 'text-zinc-200'
                                    }`}
                                >
                                    {task.title}
                                </label>

                                <button
                                    onClick={() => router.delete(`/tasks/${task.id}`, {
                                        preserveScroll: true,
                                        preserveState: true,
                                    })}
                                    className="text-zinc-700 hover:text-red-400 transition text-xs
                                            opacity-0 group-hover:opacity-100"
                                    aria-label={`Delete task: ${task.title}`}
                                >
                                    X
                                </button>
                            </li>
                        ))}
                    </ul>
                </section>

            </main>

            {/* footer — semantic landmark for page footer */}
            <footer className="w-full max-w-lg mt-16 text-center text-xs text-zinc-700">
                Task Manager &mdash; {new Date().getFullYear()}
            </footer>

        </div>
    );
}