import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

type AddItemFormPropsType = {
    addItem: (newTitle: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {

    let [newTitle, setNewTitle] = useState("")
    let [error, setError] = useState<null | string>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => { setNewTitle(e.currentTarget.value) }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            if (newTitle.trim() !== "") {
                props.addItem(newTitle.trim())
                setNewTitle("");
            }
            else {
                setError("Field is required");
            }
        }
    }
    const addTask = () => {
        if (newTitle.trim() !== "") {
            props.addItem(newTitle.trim())
            setNewTitle("");
        }
        else {
            setError("Field is required");
        }
    }

    return <div>
        <input
            value={newTitle}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            className={error ? "error" : ""}
        />
        <button onClick={addTask}>+</button>
        {error && <div className="error-message">{error}</div>}
    </div>
}

export default AddItemForm;
