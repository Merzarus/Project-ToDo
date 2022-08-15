import axios from "axios";
import { Todo, TodoStatus, TodoApi } from "../types";
import env from "../env";

const statusToBoolean = (todoStatus: TodoStatus): boolean => {
  switch (todoStatus) {
    case "NOT_DONE":
      return false;
    case "DONE":
      return true;
  }
}

const booleanToStatus = (status: boolean): TodoStatus => {
  if (!status)
    return "NOT_DONE";
  return "DONE";
}

const todoApiToTodo = (todoApi: TodoApi): Todo => {
  return {
    ...todoApi,
    status: statusToBoolean(todoApi.status),
  };
}

const todoToTodoApi = (todo: Todo): TodoApi => {
  return {
    ...todo,
    status: booleanToStatus(todo.status),
  };
}

const getTodo = async (id: number): Promise<Todo> => {
  return await axios
    .get(`${env.apiURL}/todo/${id}`)
    .then((response) => todoApiToTodo(response.data));
};

const listTodos = async (): Promise<Todo[]> => {
  return await axios
    .get(`${env.apiURL}/todos`)
    .then((response): Todo[] => {
      return response.data.map(todoApiToTodo);
    });
};

const deleteTodo = async (id: number): Promise<Todo> => {
  return await axios
    .delete(`${env.apiURL}/todo/${id}`)
    .then((response) => todoApiToTodo(response.data));
}

const updateTodo = async (id: number, todo: Todo): Promise<Todo> => {
  const todoApi = todoToTodoApi(todo);
  return await axios
    .put(`${env.apiURL}/todo/${id}`, todoApi)
    .then((response) => todoApiToTodo(response.data));
}

const createTodo = async (title: string): Promise<Todo> => {
  return await axios
    .post(`${env.apiURL}/todo`, { title })
    .then((response) => todoApiToTodo(response.data));
}

export default {
  getTodo,
  listTodos,
  deleteTodo,
  updateTodo,
  createTodo,
}