import { FilterValuesType, TodolistType } from "../App";
import { v4 as uuidv4 } from 'uuid';

export type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST',
  id: string
}

export type AddTodoListActionType = {
  type: 'ADD-TODOLIST',
  title: string
}

export type ChangeTodolistTitleActionType = {
  type: 'CHANGE-TODOLIST-TITLE',
  id: string,
  title: string
}

export type ChangeTodolistFilterActionType = {
  type: 'CHANGE-TODOLIST-FILTER',
  id: string,
  filter: FilterValuesType
}

type ActionTypes =
  RemoveTodolistActionType
  | AddTodoListActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType

export const todolistsReducer = (state: TodolistType[], action: ActionTypes): TodolistType[] => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter(tl => tl.id !== action.id)
    }
    case 'ADD-TODOLIST': {
      return [...state, {
        id: uuidv4(),
        title: action.title,
        filter: 'all'
      }]
    }
    case 'CHANGE-TODOLIST-TITLE': {
      const todolist = state.find(tl => tl.id === action.id)
      if (todolist) {
        todolist.title = action.title
      }
      return [...state]
    }
    case 'CHANGE-TODOLIST-FILTER': {
      const todolist = state.find(tl => tl.id === action.id)
      if (todolist) {
        todolist.filter = action.filter
      }
      return [...state]
    }
    default:
      throw new Error('I don`t get this type')
  }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
  return { type: 'REMOVE-TODOLIST', id: todolistId }
}

export const AddTodoListAC = (title: string): AddTodoListActionType => {
  return { type: 'ADD-TODOLIST', title }
}

export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
  return { type: 'CHANGE-TODOLIST-TITLE', title, id }
}

export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
  return { type: 'CHANGE-TODOLIST-FILTER', filter, id }
}