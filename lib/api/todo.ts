import axios from ".";
import { TodoType } from "../../types/todo";

export const getTodosApi = () => axios.get<TodoType[]>("api/todos");