import { v4 as uuidv4 } from 'uuid';
import { TodolistType } from "../App";
import { todolistsReducer } from "./todolists-reducer";


test('correct todolist should be removed', () => {
  let todolistId1 = uuidv4()
  let todolistId2 = uuidv4()
  
  const startState: TodolistType[] = [
    {id: todolistId1, title: 'What to learn', filter: 'all'},
    {id: todolistId2, title: 'What to learn', filter: 'all'},
  ]
  
  const endState = todolistsReducer(startState, {type: 'REMOVE-TODOLIST', id: todolistId1})
  
  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
  let todolistId1 = uuidv4()
  let todolistId2 = uuidv4()
  
  let newTodolistTitle = 'New Todolist'
  
  const startState: TodolistType[] = [
    {id: todolistId1, title: 'What to learn', filter: 'all'},
    {id: todolistId2, title: 'What to learn', filter: 'all'},
  ]
  
  const endState = todolistsReducer(startState, {type: 'ADD-TODOLIST', title: newTodolistTitle})
  
  expect(endState.length).toBe(3)
  expect(endState[2].title).toBe('New Todolist')
  expect(endState[2].filter).toBe('all')
})