import axios from ".";
import { TodoType } from "../../types/todo";

export const getTodosApi = () => axios.get<TodoType[]>("api/todos");
export const checkTodoAPI = (id: number) => axios.patch(`api/todos/${id}`);