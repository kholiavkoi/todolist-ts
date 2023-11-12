import React, { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from "./Todolist";
import { v4 as uuidv4 } from 'uuid';
import { AddItemForm } from "./AddItemForm";
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

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
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      
      <Container fixed>
        <Grid container style={{ padding: "20px" }}>
          <AddItemForm addItem={addTodoList} />
        </Grid>
        
        <Grid container spacing={3}>
          
          {todolists.map((tl) => {
            let tasksForTodoList = tasksObj[tl.id]
            
            if (tl.filter === 'completed') {
              tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
            }
            
            if (tl.filter === 'active') {
              tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
            }
            
            return <Grid item key={tl.id}>
              <Paper style={{ padding: "10px" }}>
                <Todolist
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
              </Paper>
            </Grid>
          })}
        </Grid>
      </Container>
    
    </div>
  );
}

export default App;
