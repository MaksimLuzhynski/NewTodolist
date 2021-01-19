import React, { useState } from 'react';
import './App.css';
import Todolist from './Todolist';
import { v1 } from 'uuid';

export type FilterValuesType = "all" | "complited" | "active"

function App() {

    let [tasks, setTasks] = useState([
        { id: v1(), title: "HTML", isDone: true },
        { id: v1(), title: "React", isDone: false },
        { id: v1(), title: "JS", isDone: true },
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
    function removeTask(id: string) {
        let filteredTasks = tasks.filter(item => item.id !== id);
        setTasks(filteredTasks);
    }

    // Ниже ф-ция добавления тасок
    function addTask(newTaskTitle: string) {
        let task = { id: v1(), title: newTaskTitle, isDone: false };
        let newTask = [task, ...tasks];
        setTasks(newTask);
    }
    //Ниже ф-ция, меняющая значение чекбокса
    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find(item => item.id === taskId)
        if (task) {
            task.isDone = isDone;
            setTasks([...tasks]);
        }

    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeStatus={changeStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;

// function App() {

//     let [date, setDate] = useState(5)
//     return <div onClick={() => { setDate(date + 3) }}>{date}</div>

// }



