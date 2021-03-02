import React, { ChangeEvent, useState } from 'react';

type EditableSpanType = {
    title: string
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanType) {

    let [editeMode, setEditeMode] = useState(false)
    let [title, setTitle] = useState("")

    const activeEditeMode = () => {
        setEditeMode(true);
        setTitle(props.title);
    }
    const activeViewMode = () => {
        setEditeMode(false);
        props.onChange(title);
    }
    const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    return editeMode
        ? <input
            value={title}
            onBlur={activeViewMode}
            autoFocus
            onChange={onChangeTitleHandler}
        />
        : <span
            onDoubleClick={activeEditeMode}
        > {props.title} </span>
}
