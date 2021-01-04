import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValuesType } from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (newTaskTitle: string) => void
}

function Todolist(props: PropsType) {

    let [newTaskTitle, setNewTaskTitle] = useState("")

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => { setNewTaskTitle(e.currentTarget.value) }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.addTask(newTaskTitle)
            setNewTaskTitle("");
        }
    }
    const addTask = () => {
        props.addTask(newTaskTitle)
        setNewTaskTitle("");
    }
    const onAllClickHandler = () => { props.changeFilter("all") }
    const onActiveClickHandler = () => { props.changeFilter("active") }
    const onComplitedClickHandler = () => { props.changeFilter("complited") }

    return (
        <div className="App">
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input
                        value={newTaskTitle}
                        onChange={onChangeHandler}
                        onKeyPress={onKeyPressHandler}
                    />
                    <button onClick={addTask}>+</button>
                </div>
                <ul>
                    {
                        props.tasks.map(item => {

                            const onRemoveHandler = () => { props.removeTask(item.id) }

                            return <li key={item.id}>
                                <input type="checkbox" checked={item.isDone} />
                                <span>{item.title}</span>
                                <button onClick={onRemoveHandler}>x</button>
                            </li>
                        })
                    }
                </ul>
                <div>
                    <button onClick={onAllClickHandler}>All</button>
                    <button onClick={onActiveClickHandler}> Active</button>
                    <button onClick={onComplitedClickHandler}>Completed</button>
                </div>
            </div>
        </div>
    );
}

export default Todolist;