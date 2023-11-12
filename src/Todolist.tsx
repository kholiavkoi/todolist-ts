import React, { ChangeEvent } from "react";
import { FilterValuesType } from "./App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Checkbox, IconButton } from "@mui/material";

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
	changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
	changeTodoTitle: (todolistId: string, newTitle: string) => void
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
	                         removeTodolist,
	                         changeTaskTitle,
	                         changeTodoTitle
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

	const changeTodolistTitle = (newTitle: string) => {
		changeTodoTitle(id, newTitle)
	}

	const addNewTask = (title: string) => {
		addTask(title, id)
	}

	return (
		<div>
			<h3>
				<EditableSpan title={title} onChange={changeTodolistTitle} />
				<IconButton onClick={removeTodo}>
					<DeleteIcon />
				</IconButton>
			</h3>
			<AddItemForm addItem={addNewTask} />
			<div>
				{tasks.map(task => {
					const onRemoveHandler = () => {
						removeTask(task.id, id)
					}

					const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
						changeStatus(task.id, e.currentTarget.checked, id)
					}

					const onChangeTitleHandler = (newValue: string) => {
						changeTaskTitle(task.id, newValue, id)
					}

					return <div className={task.isDone ? 'is-done' : ''} key={task.id}>
						<Checkbox
						       onChange={onChangeStatusHandler}
						       checked={task.isDone} />
						<EditableSpan title={task.title} onChange={onChangeTitleHandler} />
						<IconButton onClick={onRemoveHandler}>
							<DeleteIcon />
						</IconButton>
					</div>
				})}

			</div>

			<div>
				<Button variant={filter === 'all' ? 'contained' : 'text'} color='success' onClick={onAllClickHandler}>All</Button>
				<Button color='primary' variant={filter === 'active' ? 'contained' : 'text'} onClick={onActiveClickHandler}>Active
				</Button>
				<Button color='secondary' variant={filter === 'completed' ? 'contained' : 'text'}
				        onClick={onCompletedClickHandler}>Completed
				</Button>
			</div>
		</div>
	)
}

