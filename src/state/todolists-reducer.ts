import { TodolistType } from "../App";
import { v4 as uuidv4 } from 'uuid';


type ActionType = {
  type: string
  [key: string]: any
}

export const todolistsReducer = (state: TodolistType[], action: ActionType): TodolistType[] => {
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
    default:
      throw new Error('I don`t get this type')
  }
}