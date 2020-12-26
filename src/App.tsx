import { type } from 'os';
import React, { useState } from 'react';
import './App.css';
import Todolist from './Todolist';

export type FilterValuesType = "all" | "complited" | "active"

function App() {

    let [tasks, setTasks] = useState([
        { id: 1, title: "HTML", isDone: true },
        { id: 2, title: "React", isDone: false },
        { id: 3, title: "JS", isDone: true },
    ]);

    let [filter, setFilter] = useState<FilterValuesType>("all")

    let tasksForTodolist = tasks

    if (filter === "complited") {
        tasksForTodolist = tasks.filter(item => item.isDone === true)
    }
    if (filter === "active") {
        tasksForTodolist = tasks.filter(item => item.isDone === false)
    }
    
    // Ниже ф-ция фильтрации тасок
    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    // Ниже ф-ция удаления тасок
    function removeTask(id: number) {
        let filteredTasks = tasks.filter(item => item.id !== id);
        setTasks(filteredTasks);
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;

// function App() {

//     let [date, setDate] = useState(5)
//     return <div onClick={() => { setDate(date + 3) }}>{date}</div>

// }



