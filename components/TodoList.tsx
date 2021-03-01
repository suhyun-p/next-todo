import React, { useMemo, useCallback, useState } from "react";
import styled from "styled-components";
import palette from "../styles/palette";
import { TodoType } from "../types/todo";
import TrashCanIcon from "../public/statics/svg/trash-can.svg";
import CheckMarkIcon from "../public/statics/svg/check-mark.svg";
import { checkTodoAPI, deleteTodoAPI } from "../lib/api/todo";
import { Router, useRouter } from "next/dist/client/router";

const Container = styled.div`
    width: 100%;

    .todo-num {
        margin-left: 12px;
    }

    .todo-list-header {
        padding: 12px;
        position: relative;
        border-bottom: 1px solid ${palette.gray};

        .todo-list-last-todo {
            font-size: 14px;
            margin: 0 0 8px;
            span {
                margin-left: 12px;
            }
        }

        .todo-list-header-colors {
            display: flex;
            .todo-list-header-color-num {
                display: flex;
                margin-right: 8px;
                p {
                    font-size: 14px;
                    line-height: 16px;
                    margin: 0;
                    margin-left: 6px;
                }
                .todo-list-header-round-color {
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                }
            }
        }
    }

    .bg-blue {
        background-color: ${palette.blue};
    }

    .bg-green {
        background-color: ${palette.green};
    }

    .bg-navy {
        background-color: ${palette.navy};
    }

    .bg-orange {
        background-color: ${palette.orange};
    }

    .bg-red {
        background-color: ${palette.red};
    }

    .bg-yellow {
        background-color: ${palette.yellow};
    }

    .todo-list {
        .todo-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 52px;
            border-bottom: 1px solid ${palette.gray};
            .todo-left-side {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                .todo-color-block {
                    width: 12px;
                    height: 100%;
                }
                .checked-todo-text {
                    color: ${palette.gray};
                    text-decoration: line-through;
                }
                .todo-text{
                    margin-left: 12px;
                    font-size: 16px;
                }
            }
            .todo-right-side {
                display: flex;
                margin-right: 12px;
                svg {
                    &:first-child {
                        margin-right: 16px;
                    }
                }
                .todo-trash-can {
                    width: 16px;
                    path {
                        fill: ${palette.deep_red};
                    }
                }
                .todo-check-mark {
                    fill : ${palette.deep_green};
                }
                .todo-button {
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    border: 1px solid ${palette.gray};
                    background-color: transparent;
                    outline: none;
                }
            }
        }
    }
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
    const getTodoColorNums = useCallback(() => {
        let red = 0;
        let orange = 0;
        let yellow = 0;
        let green = 0;
        let blue = 0;
        let navy = 0;
        todos.forEach((todo) => {
            switch (todo.color) {
                case "red":
                    red += 1;
                    break;
                case "orange":
                    orange += 1;
                    break;
                case "yellow":
                    yellow += 1;
                    break;
                case "green":
                    green += 1;
                    break;
                case "blue":
                    blue += 1;
                    break;
                case "navy":
                    navy += 1;
                    break;
                default:
                    break;
            }
        });

        return {
            red, orange, yellow, green, blue, navy
        };
    }, [todos]);
    // console.log(getTodoColorNums());
    const todoColorNums = useMemo(getTodoColorNums, [todos]);

    type ObjectIndexType = {
        [key: string]: number | undefined;
    };

    const todoColorNums2 = useMemo(() => {
        const colors: ObjectIndexType = {};
        todos.forEach((todo) => {
            const value = colors[todo.color];
            if(!value) {
                colors[`${todo.color}`] = 1;
            } else {
                colors[`${todo.color}`] = value + 1;
            }
        });
        return colors;
    }, [todos]);
    // console.log(todoColorNums2);

    const router = useRouter();
    const [localTodos, setLocalTodos] = useState(todos);

    const checkTodo = async (id: number) => {
        try {
            await checkTodoAPI(id);
            console.log("체크했습니다.");

            // 체크를 적용하는 방법1 (데이터 다시 받기)
            // router.reload();

            // 체크를 적용하는 방법2 (데이터 다시 받기)
            // router.push("/");

            // 체크를 적용하는 방법3 (data를 local로 저장하여 사용하기)
            const newTodos = localTodos.map((todo) => {
                if(todo.id === id) {
                    return {...todo, checked: !todo.checked};
                }
                return todo;
            });
            setLocalTodos(newTodos);
        } catch(e) {
            console.log(e);
        }
    }

    // 투두 삭제하기
    const deleteTodo = async (id: number) => {
        try {
            await deleteTodoAPI(id);
            const newTodos = localTodos.filter((todo) => todo.id !== id);
            setLocalTodos(newTodos);
            console.log("삭제했습니다.");
        } catch(e) {
            console.log(e);
        }
    }

    return (
        <Container>
            <div className="todo-list-header">
                <p className="todo-list-last-todo">
                    남은 TODO<span>{localTodos.length}개</span>
                </p>
                <div className="todo-list-header-colors">
                    {Object.keys(todoColorNums).map((color, index) => (
                        <div className="todo-list-header-color-num" key={index}>
                            <div className={`todo-list-header-round-color bg-${color}`} />
                            <p>{todoColorNums[color]}개</p>
                        </div>
                    ))}
                </div>
            </div>
            <ul className="todo-list">
                {localTodos.map((todo) => (
                    <li className="todo-item" key={todo.id}>
                        <div className="todo-left-side">
                            <div className={`todo-color-block bg-${todo.color}`} />
                            <p className={`todo-text ${ todo.checked ? "checked-todo-text" : "" }`}>
                                {todo.text}
                            </p>
                        </div>
                        <div className="todo-right-side">
                            {todo.checked && (
                                <>
                                    <TrashCanIcon className="todo-trash-can" onClick={() => {deleteTodo(todo.id)}} />
                                    <CheckMarkIcon className="todo-check-mark" onClick={() => {checkTodo(todo.id);}} />
                                </>
                            )}
                            {!todo.checked && (
                                <button type="button" className="toto-button" onClick={() => {checkTodo(todo.id);}} />
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </Container>
    );
};

export default TodoList;