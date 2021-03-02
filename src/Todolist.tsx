import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValuesType } from './App';
import AddItemForm from './AddItemForm';
import { EditableSpan } from './EditableSpan';

export type TaskType = {
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
    changeTaskTitle: (taskId: string, newValue: string, todolistID: string) => void
    removeTodolist: (todolistID: string) => void
    changeTodolistTitle: (todolistID: string, newTitle: string) => void
}

function Todolist(props: PropsType) {

    const onAllClickHandler = () => { props.changeFilter("all", props.id) }
    const onActiveClickHandler = () => { props.changeFilter("active", props.id) }
    const onComplitedClickHandler = () => { props.changeFilter("complited", props.id) }
    const removeTodolist = () => { props.removeTodolist(props.id) }
    const addTask = (title: string) => { props.addTask(title, props.id) }
    const changeTodolistTitle = (newTitle: string) => { props.changeTodolistTitle(newTitle, props.id) }

    return (
        <div className="App">
            <div>
                <h3><EditableSpan title={props.title} onChange={changeTodolistTitle} />
                    <button onClick={removeTodolist}>x</button>
                </h3>
                <AddItemForm
                    addItem={addTask}
                />
                <ul>
                    {
                        props.tasks.map(item => {

                            const onRemoveHandler = () => { props.removeTask(item.id, props.id) }
                            const onChangeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                                props.changeStatus(item.id, event.currentTarget.checked, props.id)
                            }
                            const onChangeTitleHandler = (newValue: string) => {
                                props.changeTaskTitle(item.id, newValue, props.id)
                            }

                            return <li
                                key={item.id}
                                className={item.isDone ? "is-done" : ""}>
                                <input
                                    type="checkbox"
                                    checked={item.isDone}
                                    onChange={onChangeStatusHandler}
                                />
                                <EditableSpan
                                    title={item.title}
                                    onChange={onChangeTitleHandler}
                                />
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

