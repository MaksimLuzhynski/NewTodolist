import React, { useState } from 'react';
import './App.css';
import Todolist from './Todolist';
import { v1 } from 'uuid';

export type FilterValuesType = "all" | "complited" | "active"

type TodolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}


function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        { id: todolistID1, title: "What to learn", filter: "all" },
        { id: todolistID2, title: "What to buy", filter: "all" },
    ]);

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            { id: v1(), title: "HTML", isDone: true },
            { id: v1(), title: "React", isDone: false },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "CSS", isDone: false },
            { id: v1(), title: "PHP", isDone: true }
        ],
        [todolistID2]: [
            { id: v1(), title: "Book", isDone: true },
            { id: v1(), title: "Milk", isDone: false },
        ]
    })


    // Ниже ф-ция фильтрации тасок
    function changeFilter(value: FilterValuesType, todolistID: string) {
        let todolist = todolists.find(item => item.id === todolistID)
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists]);
        }
    }

    // Ниже ф-ция удаления тасок
    function removeTask(id: string, todolistID: string) {
        let tasksOneOfTodolist = tasks[todolistID]
        let filteredTasks = tasksOneOfTodolist.filter(item => item.id !== id);
        tasks[todolistID] = filteredTasks
        setTasks({ ...tasks });
    }

    // Ниже ф-ция добавления тасок
    function addTask(newTaskTitle: string, todolistID: string) {
        let task = { id: v1(), title: newTaskTitle, isDone: false };
        let tasksOneOfTodolist = tasks[todolistID]
        let newTask = [task, ...tasksOneOfTodolist];
        tasks[todolistID] = newTask
        setTasks({ ...tasks });
    }

    //Ниже ф-ция, меняющая значение чекбокса
    function changeStatus(taskId: string, isDone: boolean, todolistID: string) {
        let tasksOneOfTodolist = tasks[todolistID]
        let task = tasksOneOfTodolist.find(item => item.id === taskId)
        if (task) {
            task.isDone = isDone;
            setTasks({ ...tasks });
        }
    }

    //Ниже ф-ция удаления тудулистов
    function removeTodolist(todolistID: string) {
        let filteredTodolists = todolists.filter(item => item.id !== todolistID);
        setTodolists(filteredTodolists);
        
        delete tasks[todolistID];
        setTasks({...tasks});
    }


    return (
        <div className="App">
            {
                todolists.map((item) => {

                    let tasksForTodolist = tasks[item.id]

                    if (item.filter === "complited") {
                        tasksForTodolist = tasksForTodolist.filter(item => item.isDone === true)
                    }
                    if (item.filter === "active") {
                        tasksForTodolist = tasksForTodolist.filter(item => item.isDone === false)
                    }

                    return <Todolist
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        filter={item.filter}
                        removeTodolist={removeTodolist}
                    />
                })
            }
        </div>
    );
}

export default App;

// function App() {

//     let [date, setDate] = useState(5)
//     return <div onClick={() => { setDate(date + 3) }}>{date}</div>

// }



