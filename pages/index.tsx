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

const app: NextPage<IProps> = () => {
    return <TodoList todos={[]} />
}

export const getServerSideProps = wrapper.getServerSideProps(
    async ({store}) => {
        try {
            const { data } = await getTodosApi();
            store.dispatch(todoActions.setTodo(data));
            return { props: {} };
        } catch (e) {
            console.log(e);
            return { props: {} }
        }
    }
)

export default app;