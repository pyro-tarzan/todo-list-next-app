"use client";

import { useTodos } from "../context/TodosContext"

export default function Page(){
    const { todos } = useTodos();
    return (
        <div className="workspace-page">
            {todos.map((todo) => (
                <div key={todo.id} className="">
                    <h3>{todo.title}</h3>
                    <ul>
                    {todo.content.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                    <li>
                        <input
                        type="text"
                        placeholder="Add a list item..."
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && e.currentTarget.value.trim()) {
                            alert(`Add "${e.currentTarget.value}" to card: ${todo.title}`);
                            e.currentTarget.value = "";
                            }
                        }}
                        />
                    </li>
                    </ul>
                </div>
            ))}
        </div>
    )
}