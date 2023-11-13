import { v4 as uuidv4 } from 'uuid';
import { FilterValuesType, TodolistType } from "../App";
import {
  AddTodoListAC,
  ChangeTodolistFilterAC,
  ChangeTodolistTitleAC,
  RemoveTodolistAC,
  todolistsReducer
} from "./todolists-reducer";


test('correct todolist should be removed', () => {
  let todolistId1 = uuidv4()
  let todolistId2 = uuidv4()
  
  const startState: TodolistType[] = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ]
  
  const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId1))
  
  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
  let todolistId1 = uuidv4()
  let todolistId2 = uuidv4()
  
  let newTodolistTitle = 'New Todolist'
  
  const startState: TodolistType[] = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ]
  
  const endState = todolistsReducer(startState, AddTodoListAC(newTodolistTitle))
  
  expect(endState.length).toBe(3)
  expect(endState[2].title).toBe('New Todolist')
  expect(endState[2].filter).toBe('all')
})

test('correct todolist should change its name', () => {
  let todolistId1 = uuidv4()
  let todolistId2 = uuidv4()
  
  let newTodolistTitle = 'New Todolist'
  
  const startState: TodolistType[] = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ]
  
  const action = ChangeTodolistTitleAC(todolistId2, newTodolistTitle)
  
  const endState = todolistsReducer(startState, action)
  
  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe(newTodolistTitle)
  
})

test('correct filter of todolist should be changed', () => {
  let todolistId1 = uuidv4()
  let todolistId2 = uuidv4()
  
  let newFilter: FilterValuesType = 'completed'
  
  const startState: TodolistType[] = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ]
  
  const action = ChangeTodolistFilterAC(todolistId2, newFilter)
  
  const endState = todolistsReducer(startState, action)
  
  expect(endState[0].filter).toBe('all')
  expect(endState[1].filter).toBe(newFilter)
})