import React, { useState } from 'react';
import './App.css';
import Todolist, { TaskType } from './Todolist';
import { v1 } from 'uuid';
import AddItemForm from './AddItemForm';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';

export type FilterValuesType = "all" | "complited" | "active"

export type TodolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        { id: todolistID1, title: "What to learn", filter: "all" },
        { id: todolistID2, title: "What to buy", filter: "all" },
    ]);

    let [tasks, setTasks] = useState<TasksStateType>({
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

    //Ниже ф-ция, меняющая название таски
    function changeTaskTitle(taskId: string, newValue: string, todolistID: string) {
        let tasksOneOfTodolist = tasks[todolistID]
        let task = tasksOneOfTodolist.find(item => item.id === taskId)
        if (task) {
            task.title = newValue;
            setTasks({ ...tasks });
        }
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
        setTasks({ ...tasks });
    }

    // Ниже ф-ция добавления тудулистов
    function addTodolist(newTitle: string) {
        let newTodolist: TodolistsType = { id: v1(), title: newTitle, filter: "all" };
        setTodolists([newTodolist, ...todolists]);
        setTasks({ ...tasks, [newTodolist.id]: [] });
    }

    //Ниже ф-ция, меняющая название тудулиста
    function changeTodolistTitle(newTitle: string, todolistID: string) {
        let todolist = todolists.find(item => item.id === todolistID)
        if (todolist) {
            todolist.title = newTitle;
            setTodolists([...todolists]);
        }
    }


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">
                        News
    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding:"20px"}}>
                    <AddItemForm
                        addItem={addTodolist}
                    />
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map((item) => {

                            let tasksForTodolist = tasks[item.id]

                            if (item.filter === "complited") {
                                tasksForTodolist = tasksForTodolist.filter(item => item.isDone === true)
                            }
                            if (item.filter === "active") {
                                tasksForTodolist = tasksForTodolist.filter(item => item.isDone === false)
                            }

                            return <Grid item>
                                <Paper style={{padding:"20px"}}>
                                    <Todolist
                                        key={item.id}
                                        id={item.id}
                                        title={item.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeStatus={changeStatus}
                                        changeTaskTitle={changeTaskTitle}
                                        filter={item.filter}
                                        removeTodolist={removeTodolist}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;




