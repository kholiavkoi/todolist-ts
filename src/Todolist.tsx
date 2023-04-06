import React, {useState} from "react";
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
    changeFilter: (value: FilterValuesType) => void
}

export function Todolist({tasks, title, removeTask, changeFilter}: PropsType) {
    const [value, setValue] = useState('')
    const handleInput = (e: any) => {
        setValue(e.target.value)
    }
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={value} onChange={handleInput}/>
                <button>+</button>
            </div>
            <ul>
                {tasks.map(task => (
                     <li key={task.id}>
                         <input type="checkbox" checked={task.isDone} />
                         <span>{task.title}</span>
                         <button onClick={() => removeTask(task.id)}>X</button>
                     </li>
                ))}

            </ul>

            <div>
                <button onClick={() => {changeFilter('all')}}>All</button>
                <button onClick={() => {changeFilter('active')}}>Active</button>
                <button onClick={() => {changeFilter('completed')}}>Completed</button>
            </div>
        </div>
    )
}