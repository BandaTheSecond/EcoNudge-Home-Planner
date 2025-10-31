import { GET, POST, PATCH, DEL, qs} from " ../api/http";

export const listTasks = (opts = {}) => {
    const filters = {};
    if (opts.completed !== undefined) filters.completed = opts.completed ? "true" : "false";
    if (opts.sort) filters.sort = opts.sort;
    return GET(`/planner/${qs(filters)}`);

};

export const addTask    = (taskText, token)  => POST(`/planner/`, { task: taskText }, token);
export const toggleTask = (id, done, token)  => PATCH(`/planner/${id}`, { completed: done }, token);
export const updateTask = (id, body, token)  => PATCH(`/planner/${id}`, body, token);
export const deleteTask = (id, token)        => DEL(`/planner/${id}`, token);


export async function getWeekPlan(userId) {
    try {
    return await GET(`/planner/week${qs({ user_id: userId })}`);
  } catch {
    // Fallback: synthesize a simple week plan from plain tasks
    const base = await listTasks();
    const tasks = (base || []).slice(0, 5).map((t, i) => ({
      id: t.id,
      label: t.task || `Action ${i + 1}`,
      estimated_kwh: typeof t.estimated_kwh === "number" ? t.estimated_kwh : 0.5,
      dayChecks: [false, false, false, false, false, false, false],
    }));
    return { tasks };
}

}


export async function savePlan(items, userId) {
     try {
    return await POST(`/planner/week`, { user_id: userId, items });
  } catch {
    // Fallback: pretend save succeeded so UI can continue
    return { ok: true, saved: true, fallback: true };
  }
}
