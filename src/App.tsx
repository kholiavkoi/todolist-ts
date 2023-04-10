import React, { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from "./Todolist";
import { v4 as uuidv4 } from 'uuid';

export type FilterValuesType = 'all' | 'completed' | 'active'

function App() {

    const [tasks, setTasks] = useState<TaskType[]>([
        { id: uuidv4(), title: 'CSS', isDone: true },
        { id: uuidv4(), title: 'JS', isDone: true },
        { id: uuidv4(), title: 'React', isDone: false },
        { id: uuidv4(), title: 'Redux', isDone: false },
    ])

    console.log(tasks)
    const [filter, setFilter] = useState<FilterValuesType>('all')

    function removeTask(id: string) {
        const filteredTasks = tasks.filter(task => task.id !== id)

        setTasks(filteredTasks)
    }

    function addTask(title: string) {
        const task = {
            id: uuidv4(),
            title,
            isDone: false
        }
        setTasks([...tasks, task])
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    function changeStatus(id: string, isDone: boolean) {
        let task = tasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
        }

        setTasks([...tasks])
    }

    let tasksForTodoList = tasks

    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone)
    }

    if (filter === 'active') {
        tasksForTodoList = tasks.filter(t => !t.isDone)
    }


    return (
        <div className="App">
            <Todolist changeFilter={changeFilter}
                      removeTask={removeTask}
                      addTask={addTask}
                      changeStatus={changeStatus}
                      title={'Learn smth'}
                      tasks={tasksForTodoList}
                      filter={filter}
            />
        </div>
    );
}

export default App;
