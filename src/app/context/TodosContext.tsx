"use client";
import {createContext, useContext, useState} from "react";

interface Todo {
    id: number;
    title: string;
    content: string[];
}

interface TodosContextType {
    todos: Todo[];
    addTodo: (todo: Todo) => void;
}

const TodosContext = createContext<TodosContextType | undefined>(undefined);

export function TodosProvider({children}: {children: React.ReactNode}){
    const [todos, setTodos] = useState<Todo[]>([]);

    const addTodo = (todo: Todo) => {
        setTodos((prevTodos) => [todo, ...prevTodos]);
    };

    return (
        <TodosContext.Provider value={{todos, addTodo}}>
            {children}
        </TodosContext.Provider>
    )
}

export function useTodos(){
    const context = useContext(TodosContext);
    if (!context){
        throw new Error("useTodos must be used inside the TodosProvider.");
    }
    return context;
}