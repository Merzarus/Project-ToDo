import React, { useState } from "react";
import TodoService from "../services/TodoService";
import { Todo } from "../types";

type Props = {
  todo: Todo,
  refresh: () => void,
}

async function handleDelete(refresh: () => void, id: number){
  await TodoService.deleteTodo(id).then(() => {
    refresh();
  });
}

async function handleUpdateTodo(todo: Todo, setEditingTodo: (value: boolean) => void, refresh: Props["refresh"]){
  await TodoService.updateTodo(todo.id, todo).then(() => {
    setEditingTodo(false);
    refresh();
  });
}

export default function TodoComponent({todo, refresh}: Props) {
  const [todoTitle, setTodoTitle] = useState(todo.title);
  const [editingTodo, setEditingTodo] = useState(false);
  return <div key={todo.id}>
    <input type="checkbox" onChange={(e) => handleUpdateTodo({...todo, status: !todo.status}, setEditingTodo, refresh)} checked={todo.status}/>
    {editingTodo ?
      <>
        <input value={todoTitle} onChange={(e) => setTodoTitle(e.target.value)}/>
        <button onClick={() => handleUpdateTodo({...todo, title: todoTitle}, setEditingTodo, refresh)}>Save</button>
      </>
      :
      <>
        <span>{todoTitle}</span>
        <button onClick={() => setEditingTodo(true)}>✏️</button>
        <button onClick={() => handleDelete(refresh, todo.id)}>🗑️</button>
      </>   
    }
  </div>
}