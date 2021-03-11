import { FilterValuesType } from './../App';
import { v1 } from "uuid"
import { TodolistsType } from "../App"
import { todolistReducer, ChangeTodolistFilterActionType, ChangeTodolistTitleActionType, RemoveTodolistAC, AddTodolistAC, ChangeTodolistTitleAC, ChangeTodolistFilterAC} from "./todolist-reducer"


test("correct todolist should be removed", () => {

    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState: Array<TodolistsType> = [
        { id: todolistID1, title: "What to learn", filter: "all" },
        { id: todolistID2, title: "What to buy", filter: "all" },
    ]

    const endState = todolistReducer(startState, RemoveTodolistAC(todolistID1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID2)

})

test("correct todolist should be add", () => {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let newTodolistTitle = "NewTodolist"

    const startState: Array<TodolistsType> = [
        { id: todolistID1, title: "What to learn", filter: "all" },
        { id: todolistID2, title: "What to buy", filter: "all" },
    ]

    const endState = todolistReducer(startState, AddTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
    expect(endState[2].filter).toBe("all")

})

test("correct todolist should be change its name", () => {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let newTodolistTitle = "New Todolist"

    const startState: Array<TodolistsType> = [
        { id: todolistID1, title: "What to learn", filter: "all" },
        { id: todolistID2, title: "What to buy", filter: "all" },
    ];

    const endState = todolistReducer(startState, ChangeTodolistTitleAC(todolistID2, newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
})

test("correct filter of todolist should be changed", () => {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let newFilter: FilterValuesType = "complited";

    const startState: Array<TodolistsType> = [
        { id: todolistID1, title: "What to learn", filter: "all" },
        { id: todolistID2, title: "What to buy", filter: "all" },
    ];

    const endState = todolistReducer(startState, ChangeTodolistFilterAC(todolistID2, newFilter));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
   
})

