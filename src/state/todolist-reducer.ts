import { FilterValuesType } from './../App';
import { v1 } from "uuid";
import { TodolistsType } from "../App"


export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST",
    id: string
}

export type AddTodolistActionType = {
    type: "ADD-TODOLIST",
    title: string
}

export type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE",
    id: string,
    title: string
}

export type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER",
    id: string,
    filter: FilterValuesType
}

export type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

export const todolistReducer = (state: Array<TodolistsType>, action: ActionsType): Array<TodolistsType> => {

    switch (action.type) {

        case "REMOVE-TODOLIST": {
            return state.filter(item => item.id !== action.id);
        }

        case "ADD-TODOLIST": {
            let newTodolist: TodolistsType = { id: v1(), title: action.title, filter: "all" };
            return [...state, newTodolist];
        }

        case "CHANGE-TODOLIST-TITLE": {
            let changeableTodolist = state.find(item => item.id === action.id)
            if (changeableTodolist) {
                changeableTodolist.title = action.title;
                return [...state];
            }
        }

        case "CHANGE-TODOLIST-FILTER": {
            let changeableTodolist = state.find(item => item.id === action.id)
            if (changeableTodolist) {
                changeableTodolist.filter = "complited";// ?????????????? action.filter
                return [...state];
            }
        }

        default: throw new Error("I don't understand this action type.")
    }
}

export const RemoveTodolistAC = (todolistID: string): RemoveTodolistActionType => {
    return { type: "REMOVE-TODOLIST", id: todolistID }
}

export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return { type: "ADD-TODOLIST", title: title }
}

export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return { type: "CHANGE-TODOLIST-TITLE", id: id, title: title }
}

export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return { type: "CHANGE-TODOLIST-FILTER", id: id, filter: filter }
}
