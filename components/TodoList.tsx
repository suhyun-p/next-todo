import React from "react";
import styled from "styled-components";
import palette from "../styles/palette";
import { TodoType } from "../types/todo";

const Container = styled.div`
    width: 100%;
`;

const TodoHeader = styled.div`
    padding: 12px;
    border-bottom: 1px solid ${palette.gray};
`;

const TodoListLastNumber = styled.p`
    font-size: 14px;
    span {
        margin-left: 8px;
    }
`;

interface IProps {
    todos: TodoType[];
}

const TodoList: React.FC<IProps> = ({ todos }) => {
    return (
        <Container>
            <TodoHeader>
                <TodoListLastNumber>
                    남은 TODO<span>{todos.length}개</span>
                </TodoListLastNumber>
            </TodoHeader>
        </Container>
    );
};

export default TodoList;