import React, { useState, useEffect } from "react";
import TodoComponent from "./components/Todo";
import Navbar from "./components/Navbar";
import TodoService from "./services/TodoService";
import { Todo, CompletionFilter } from "./types";

const filterStatus = (todo: Todo, value: CompletionFilter): boolean => {
  switch (value) {
    case "all":
      return true;
    case "completed":
      return todo.status === true;
    case "not-completed":
      return todo.status === false;
  }
}

const todoTitleContains = (todo: Todo, value: string): boolean => {
  return todo.title.includes(value);
}

const applyTodosFiltering = (todo: Todo, value: string, status: CompletionFilter): boolean => {
  const todoMatchesFilter = todoTitleContains(todo, value)
  const todoStatusMatchesFilter = filterStatus(todo, status);
  return todoMatchesFilter && todoStatusMatchesFilter;
}


export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [filterForCompleted, setFilterForCompleted] = useState<CompletionFilter>("all");

  const refreshTodosFromDatabase = async () => {
    return TodoService
      .listTodos()
      .then((todos) => refreshFilter(todos, filter, filterForCompleted));
  }

  const refreshFilter = (currentTodos: Todo[], value: string, show: CompletionFilter) => {
    const newFilteredTodos = 
      value.length < 1 ?
      currentTodos.filter((todo) => applyTodosFiltering(todo, value, show))
      : currentTodos;

    setTodos(currentTodos);
    setFilteredTodos(newFilteredTodos);
  }

  const filterTodos = (value: string) => {
    setFilter(value);
    refreshFilter(todos, value, filterForCompleted);
  }

  const filterTodosByCompletion = (value: CompletionFilter) => {
    setFilterForCompleted(value);
    refreshFilter(todos, filter, value);
  }

  useEffect(() => {
    refreshTodosFromDatabase();
  }, [])

  function handleCreateTodo(value: string){
    const todoExists =
      todos.some((todo) => value === todo.title);
    if (value.length < 1 || todoExists)
      return () => {};
    return () => {
      TodoService
        .createTodo(value)
        .then(() => refreshTodosFromDatabase());
    };
  }

  return (
    <>
      <Navbar
        onSubmit={handleCreateTodo}
        setFilter={filterTodos}
        filterValue={filter}
        filterForCompleted={filterForCompleted}
        setCompletedFilter={filterTodosByCompletion}
      />
      <div>
        {filteredTodos.map((todo) =>
          <TodoComponent
            key={todo.id}
            todo={todo}
            refresh={() => refreshTodosFromDatabase()}
          />
        )}
      </div>
    </>
  );
}
