const createTask = async (title) => {
    const capitalizedTitle = title.charAt(0).toUpperCase() + title.slice(1);

    if (title !== '' && title !== "alldone()" && title !== "alldel()" && title !== "allundone()") {
        const res = await axios.post('http://localhost:3001/tasks', {
            id: tasks.length === 0 ? 1 : tasks[tasks.length - 1].id + 1,
            title: capitalizedTitle,
            status: false,
        })

        const updatedTasks = [
            ...tasks,
            res.data
        ]
        setTasks(updatedTasks);
    }

    // --------------------------------------------------------------------------
    if (title === "alldel()") {
        tasks.map(async (task) => {
            await axios.delete(`http://localhost:3001/tasks/${task.id}`)
        })
        setTasks([]);
    } else if (title === "alldone()") {
        (async () => {
            tasks.map(async (task, i) => {
                await axios.put(`http://localhost:3001/tasks/${task.id}`, {
                    title: task.title,
                    status: true
                });
                setReloader(!reloader);
            });
        })();
    } else if (title === "allundone()") {
        (async () => {
            tasks.map(async (task, i) => {
                await axios.put(`http://localhost:3001/tasks/${task.id}`, {
                    title: task.title,
                    status: false
                });
                setReloader(!reloader);
            });
        })();
    }
    // --------------------------------------------------------------------------

}

const deleteTaskById = async (id) => {
    await axios.delete(`http://localhost:3001/tasks/${id}`);

    const delUpdatedTasks = [
        ...tasks.filter((task) => {
            return task.id !== id;
        })
    ];

    setTasks(delUpdatedTasks);
}

const handleEditTask = async (newTask) => {
    const editUpdatedTasks = [
        ...tasks.slice(0, newTask.id - 1),
        newTask,
        ...tasks.slice(newTask.id)
    ]
    setTasks(editUpdatedTasks);
}