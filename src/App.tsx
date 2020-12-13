import React from 'react';
import './App.css';
import Todolist from './Todolist';

function App() {

    let task1 = [
        { id: 1, title: "HTML", isDone: true },
        { id: 2, title: "React", isDone: false },
        { id: 3, title: "JS", isDone: true },
    ]

    let task2 = [
        { id: 1, title: "Terminator", isDone: true },
        { id: 2, title: "XXX", isDone: false },
        { id: 3, title: "Alone at home", isDone: true },
    ]

    return (
        <div className="App">
            <Todolist title="What to learn" tasks={task1} />
            <Todolist title="Movies" tasks={task2} />
        </div>
    );
}

export default App;
