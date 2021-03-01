import axios from ".";
import { TodoType } from "../../types/todo";

export const getTodosApi = () => axios.get<TodoType[]>("api/todos");
export const checkTodoAPI = (id: number) => axios.patch(`api/todos/${id}`);

// 투두 추가하기 API Body
interface AddTodoAPIBody {
    text: string;
    color: TodoType["color"]
}

// 투두 추가하기 API
export const addTodoAPI = (body: AddTodoAPIBody) => {
    axios.post("/api/todos", body);
}