import React, { ChangeEvent, KeyboardEvent, useState } from "react";

type AddItemFormPropsType = {
	addItem: (title: string) => void
}

export function AddItemForm({ addItem }: AddItemFormPropsType) {
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
		addItem(newTaskTitle.trim())
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


	return (
		<div>
			<input className={error ? 'error' : ''}
			       value={newTaskTitle}
			       onKeyDown={onKeyDownHandler}
			       onChange={onChangeHandle} />
			<button onClick={handleAddTask}>+</button>
			{error && <div className='error-message'>{error}</div>}
		</div>
	)
}