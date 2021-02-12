import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValuesType } from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskId: string, todolistID: string) => void
    changeFilter: (value: FilterValuesType, todolistID: string) => void
    addTask: (newTaskTitle: string, todolistID: string) => void
    changeStatus: (taskId: string, isDone: boolean, todolistID: string) => void
    removeTodolist: (todolistID: string) => void
}

function Todolist(props: PropsType) {

    let [newTaskTitle, setNewTaskTitle] = useState("")
    let [error, setError] = useState<null | string>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => { setNewTaskTitle(e.currentTarget.value) }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            if (newTaskTitle.trim() !== "") {
                props.addTask(newTaskTitle.trim(), props.id)
                setNewTaskTitle("");
            }
            else {
                setError("Field is required");
            }
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== "") {
            props.addTask(newTaskTitle.trim(), props.id)
            setNewTaskTitle("");
        }
        else {
            setError("Field is required");
        }
    }
    const onAllClickHandler = () => { props.changeFilter("all", props.id) }
    const onActiveClickHandler = () => { props.changeFilter("active", props.id) }
    const onComplitedClickHandler = () => { props.changeFilter("complited", props.id) }
    const removeTodolist = () => { props.removeTodolist(props.id) }

    return (
        <div className="App">
            <div>
                <h3>{props.title}
                    <button onClick={removeTodolist}>x</button>
                </h3>
                <div>
                    <input
                        value={newTaskTitle}
                        onChange={onChangeHandler}
                        onKeyPress={onKeyPressHandler}
                        className={error ? "error" : ""}
                    />
                    <button onClick={addTask}>+</button>
                    {error && <div className="error-message">{error}</div>}
                </div>
                <ul>
                    {
                        props.tasks.map(item => {

                            const onRemoveHandler = () => { props.removeTask(item.id, props.id) }
                            const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                                props.changeStatus(item.id, event.currentTarget.checked, props.id)
                            }

                            return <li
                                key={item.id}
                                className={item.isDone ? "is-done" : ""}>
                                <input
                                    type="checkbox"
                                    checked={item.isDone}
                                    onChange={onChangeHandler}
                                />
                                <span>{item.title}</span>
                                <button onClick={onRemoveHandler}>x</button>
                            </li>
                        })
                    }
                </ul>
                <div>
                    <button className={props.filter === "all" ? "active-filter" : ""}
                        onClick={onAllClickHandler}>All</button>
                    <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={onActiveClickHandler}> Active</button>
                    <button className={props.filter === "complited" ? "active-filter" : ""}
                        onClick={onComplitedClickHandler}>Completed</button>
                </div>
            </div>
        </div>
    );
}

export default Todolist;