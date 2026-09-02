import { useForm, router } from '@inertiajs/react';

export default function Index({ tasks }) {
    const { data, setData, post, reset } = useForm({
        title: '',
    });

    function addTask(e) {
        e.preventDefault();

        post('/tasks', {
            onSuccess: () => reset('title'),
        });
    }

    return (
        <div>
            <h1>Task Manager</h1>

            <form onSubmit={addTask}>
                <input
                    type="text"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    placeholder="Enter a task"
                />

                <button type="submit">
                    Add Task
                </button>
            </form>

            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <input
                            type="checkbox"
                            checked={task.is_done}
                            onChange={(e) =>
                                router.patch(`/tasks/${task.id}`, {
                                    is_done: e.target.checked,
                                })
                            }
                        />

                        <span>
                            {task.title}
                        </span>

                        <button onClick={() => router.delete(`/tasks/${task.id}`)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}