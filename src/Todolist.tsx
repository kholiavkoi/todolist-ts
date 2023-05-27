import React, { ChangeEvent } from "react";
import { FilterValuesType } from "./App";
import { AddItemForm } from "./AddItemForm";

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

type PropsType = {
	id: string
	title: string
	tasks: TaskType[]
	removeTask: (id: string, todolistId: string) => void
	changeFilter: (value: FilterValuesType, todolistId: string) => void
	addTask: (title: string, todolistId: string) => void
	changeStatus: (id: string, isDone: boolean, todolistId: string) => void
	filter: FilterValuesType
	removeTodolist: (todolistId: string) => void
}

export function Todolist({
	                         tasks,
	                         title,
	                         removeTask,
	                         changeFilter,
	                         addTask,
	                         changeStatus,
	                         filter,
	                         id,
	                         removeTodolist
                         }: PropsType) {

	const onAllClickHandler = () => {
		changeFilter('all', id)
	}
	const onActiveClickHandler = () => {
		changeFilter('active', id)
	}
	const onCompletedClickHandler = () => {
		changeFilter('completed', id)
	}

	const removeTodo = () => {
		removeTodolist(id)
	}

	const newAddTask = (title: string) => {
		addTask(title, id)
	}


	return (
		<div>
			<h3>{title}
				<button onClick={removeTodo}>x</button>
			</h3>
			<AddItemForm addItem={newAddTask} />
			<ul>
				{tasks.map(task => {
					const onRemoveHandler = () => {
						removeTask(task.id, id)
					}

					const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
						changeStatus(task.id, e.currentTarget.checked, id)
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
				<button className={filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active
				</button>
				<button className={filter === 'completed' ? 'active-filter' : ''}
				        onClick={onCompletedClickHandler}>Completed
				</button>
			</div>
		</div>
	)
}

