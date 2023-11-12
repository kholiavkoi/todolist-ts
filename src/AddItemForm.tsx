import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { IconButton, TextField } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

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
			<TextField error={!!error}
			           variant='outlined'
					       value={newTaskTitle}
			           label='Type value'
			           helperText={error}
					       onKeyDown={onKeyDownHandler}
					       onChange={onChangeHandle} />
			<IconButton onClick={handleAddTask} color='primary'>
				<AddCircleOutlineIcon />
			</IconButton>
		</div>
	)
}