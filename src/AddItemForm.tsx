import { Button, IconButton, TextField } from '@material-ui/core';
import { AddBox } from '@material-ui/icons';
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
        <TextField
            value={newTitle}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}

            variant={"outlined"}
            label={"Type value"}
            error={!!error}// (!!-псевдоистина/псевдоложь, надо глянуть еще раз)
            helperText={error}
        />
        <IconButton onClick={addTask} color={'primary'}><AddBox/></IconButton>
    </div>
}

export default AddItemForm;
