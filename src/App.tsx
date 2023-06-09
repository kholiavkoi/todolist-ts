import React, { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from "./Todolist";
import { v4 as uuidv4 } from 'uuid';
import { AddItemForm } from "./AddItemForm";

export type FilterValuesType = 'all' | 'completed' | 'active'

type TodolistType = {
	id: string,
	title: string,
	filter: FilterValuesType
}

type TasksStateType = {
	[key: string]: Array<TaskType>
}

function App() {
	const todolistId1 = uuidv4()
	const todolistId2 = uuidv4()

	const [todolists, setTodolists] = useState<TodolistType[]>([
		{ id: todolistId1, title: 'What to learn', filter: 'all' },
		{ id: todolistId2, title: 'What to buy', filter: 'all' }
	])

	const [tasksObj, setTasks] = useState<TasksStateType>({
		[todolistId1]: [
			{ id: uuidv4(), title: 'CSS', isDone: true },
			{ id: uuidv4(), title: 'JS', isDone: true },
			{ id: uuidv4(), title: 'React', isDone: false },
			{ id: uuidv4(), title: 'Redux', isDone: false }
		],
		[todolistId2]: [
			{ id: uuidv4(), title: 'Bread', isDone: true },
			{ id: uuidv4(), title: 'Cookies', isDone: false },
			{ id: uuidv4(), title: 'Milk', isDone: false }
		]
	})

	const removeTodolist = (todolistId: string) => {
		const filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
		setTodolists(filteredTodolist)
		delete tasksObj[todolistId]
		setTasks({ ...tasksObj })
	}

	function removeTask(id: string, todolistId: string) {
		const tasks = tasksObj[todolistId]
		tasksObj[todolistId] = tasks.filter(task => task.id !== id)
		setTasks({ ...tasksObj })
	}

	function addTask(title: string, todolistId: string) {
		const task = { id: uuidv4(), title, isDone: false }
		const tasks = tasksObj[todolistId]

		tasksObj[todolistId] = [task, ...tasks]

		setTasks({ ...tasksObj })
	}

	function changeFilter(value: FilterValuesType, todolistId: string) {
		const todolist = todolists.find(tl => tl.id === todolistId)
		if (todolist) {
			todolist.filter = value
			setTodolists([...todolists])
		}
	}

	function changeTodoTitle(id: string, newTitle: string) {
		const todolist = todolists.find(tl => tl.id === id)
		if (todolist) {
			todolist.title = newTitle
			setTodolists([...todolists])
		}
	}

	function changeStatus(id: string, isDone: boolean, todolistId: string) {
		const tasks = tasksObj[todolistId]

		let task = tasks.find(t => t.id === id)
		if (task) {
			task.isDone = isDone
			setTasks({ ...tasksObj })
		}
	}

	function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
		const tasks = tasksObj[todolistId]

		let task = tasks.find(t => t.id === id)
		if (task) {
			task.title = newTitle
			setTasks({ ...tasksObj })
		}
	}

	const addTodoList = (title: string) => {
		const todolist: TodolistType = {
			id: uuidv4(),
			filter: "all",
			title
		}

		setTodolists([todolist, ...todolists])
		setTasks({
			...tasksObj,
			[todolist.id]: []
		})
	}


	return (
		<div className="App">
			<AddItemForm addItem={addTodoList} />

			{todolists.map((tl) => {
				let tasksForTodoList = tasksObj[tl.id]

				if (tl.filter === 'completed') {
					tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
				}

				if (tl.filter === 'active') {
					tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
				}

				return <Todolist
					key={tl.id}
					id={tl.id}
					changeFilter={changeFilter}
					removeTask={removeTask}
					addTask={addTask}
					changeStatus={changeStatus}
					title={tl.title}
					tasks={tasksForTodoList}
					filter={tl.filter}
					removeTodolist={removeTodolist}
					changeTaskTitle={changeTaskTitle}
					changeTodoTitle={changeTodoTitle}
				/>
			})}

		</div>
	);
}

export default App;
