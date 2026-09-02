<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index()
    {
        return Inertia::render('Tasks/Index', [
            'tasks' => Task::latest()->get(),
        ]);
    }

    public function store(Request $request)
    {
        return Task::create(
            $request->validate([
                'title' => 'required|string|max:255',
            ])
        );
    }

    public function update(Request $request, Task $task)
    {
        $task->update([
            'is_done' => $request->boolean('is_done'),
        ]);

        return $task;
    }

    public function destroy(Task $task)
    {
        $task->delete();

        return response()->noContent();
    }
}