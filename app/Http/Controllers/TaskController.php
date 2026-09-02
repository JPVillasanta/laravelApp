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
        $validated = $request->validate([
            'title' => 'required|string|max:255',
        ]);

        Task::create($validated);

        return back();
    }

    public function update(Request $request, Task $task)
    {
        $validated = $request->validate([
            'is_done' => 'required|boolean',
        ]);

        $task->update($validated);

        return back();
    }

    public function destroy(Task $task)
    {
        $task->delete();

        return back();
    }
}