import React from "react";
import { GetServerSideProps, NextPage } from "next";
import TodoList from "../components/TodoList";
import { TodoType } from "../types/todo";
import Axios from "axios";
import { getTodosApi } from "../lib/api/todo";
import {wrapper} from "../store";
import { todoActions } from "../store/todo";

interface IProps {
    todos: TodoType[];
}

const app: NextPage<IProps> = ({todos}) => {
    return <TodoList todos={todos} />
}

export const getServerSideProps = wrapper.getServerSideProps(
    async ({store}) => {
        console.log(store);
        try {
            const { data } = await getTodosApi();
            store.dispatch(todoActions.setTodo(data));
            return { props: { todos: data} };
        } catch (e) {
            console.log(e);
            return { props: { todos: []} }
        }
    }
)

export default app;