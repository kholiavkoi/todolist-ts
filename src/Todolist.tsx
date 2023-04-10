import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void,
    addTask: (title: string) => void
    changeStatus: (id: string, isDone: boolean) => void
    filter: FilterValuesType
}

export function Todolist({ tasks, title, removeTask, changeFilter, addTask, changeStatus, filter }: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) setError(null)
        setNewTaskTitle(e.target.value)
    }

    const addNewTask = () => {
        if (!newTaskTitle.trim()) {
            setError('Title is required')
            return
        }
        addTask(newTaskTitle.trim())
        setNewTaskTitle('')
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addNewTask()
        }
    }

    const handleAddTask = () => {
        addNewTask()
    }

    const onAllClickHandler = () => {
        changeFilter('all')
    }
    const onActiveClickHandler = () => {
        changeFilter('active')
    }
    const onCompletedClickHandler = () => {
        changeFilter('completed')
    }


    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input className={error ? 'error' : ''} value={newTaskTitle} onKeyDown={onKeyDownHandler} onChange={onChangeHandle} />
                <button onClick={handleAddTask}>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {tasks.map(task => {
                    const onRemoveHandler = () => {
                        removeTask(task.id)
                    }

                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        changeStatus(task.id, e.currentTarget.checked)
                    }

                    return <li className={task.isDone ? 'is-done' : ''} key={task.id}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={task.isDone} />
                        <span>{task.title}</span>
                        <button onClick={onRemoveHandler}>X</button>
                    </li>
                })}

            </ul>

            <div>
                <button className={filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
                <button className={filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active</button>
                <button className={filter === 'completed' ? 'active-filter' : ''} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}