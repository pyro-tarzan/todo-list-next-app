"use client";
import React, { useState, useEffect } from "react";
import styles from "@/app/dashboard/dashboardPage.module.scss";

interface Todo {
    id: number;
    title: string;
    content: {text: string, isStrike: boolean}[];
    date: DateNow;
    important: boolean;
}

interface DateNow {
    date: number;
    month: number;
    year: number;
}

export default function dashboardPage(){
    const [cardTitle, setCardTitle] = useState("");
    const [todos, setTodos] = useState<Todo[]>([]);
    const [taskValue, setTaskValue] = useState<{ [ key: number]: string }>({});

    useEffect(() => {
        const fetchTodos = async() => {
            try{
                const res = await fetch("/apis/all", {
                    method: "GET",
                    headers: { "Content-Type": "application/json"},
                });

                if (res.status === 200){
                    const result: Todo[] = await res.json();
                    setTodos(result || []);
                }
                
            }
            catch(error){
                console.log(error);
            }
        };

        fetchTodos();
    }, [])
    

    const handleTaskValue = (todoId: number, value: string) => {
        setTaskValue((prev) => (
            {...prev, [todoId]: value}
        ));
    }

    const handleCardTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCardTitle(e.target.value);
    };

    const handleAddATask = (todoId: number) => {
        const value = taskValue[todoId];
        if ( !value.trim() ) {
            alert("Task cannot be empty.")
            return ;
        } 

        setTodos((prevTodos) => (
            prevTodos.map((todo) => (
                todo.id == todoId
                ? {...todo, content: [...todo.content, {text: value, isStrike: false}]}
                : todo
            ))
        ));

        setTaskValue((prev) => (
            {...prev, [todoId]: ""}
        ));
    }

    const handleClickLi = (todoId: number, index: number) => {
        setTodos((prevTodos) => (
            prevTodos.map((todo) => (
                todo.id === todoId
                ? {
                    ...todo,
                    content: todo.content.map((task, i) => (
                        i === index ? {...task, isStrike: !task.isStrike} : task
                    ))
                } : todo
            ))
        ));
    }

    const handleNewTaskClick = async() => {
        if (!cardTitle.trim()){
            alert("Title is required.");
            return ;
        }

        const dateNow = new Date();
        const dateData: DateNow = {
            date: dateNow.getDate(),
            month: dateNow.getMonth(),
            year: dateNow.getFullYear()
        }

        const newTodo: Todo = {id: Date.now() + 1, title: cardTitle, content: [], date: dateData, important: false};
        // To send /apis/post/data.
        try{
            const res = await fetch("/apis/post-data", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(newTodo)
            });
            
            if ( res.status === 200){
                const result = await res.json();
                console.log(result);
                setTodos([...todos, newTodo])
                setCardTitle("");
            }
        }
        catch(error){
            console.log(error);
        }
    };

    return (
        <div className={styles.cardPanel}>
            <div className={styles.panelCont}>
                <div className={styles.panel}>
                    <input 
                        type="text" 
                        className={styles.inputFile}
                        value={cardTitle}
                        onChange={handleCardTitleChange} 
                        placeholder="Title"
                    />
                </div>
                <button 
                    onClick={handleNewTaskClick}
                    className={styles.addButton}
                >
                    +
                </button>

            </div>
            <div className={styles.workspace}>
                {todos.map((todo) => (
                    <div key={todo.id} className={styles.todoCard}>
                        <div className={styles.h2P}>
                            <h2 className={`${styles.cardItems} ${styles.cardName}`}>{todo.title}</h2>
                            <p className={`${styles.cardItems} ${styles.cardDate}`}>
                                {`${todo.date.date}/${todo.date.month}/${todo.date.year}`}
                            </p>
                        </div>
                        
                        <ul className={styles.cardItems}>
                            <div className={styles.inputAdd}>
                                <input
                                    type="text"
                                    className={styles.taskInput}
                                    value={taskValue[todo.id] || ""}
                                    onChange={(e) => handleTaskValue(todo.id, e.target.value)}
                                    placeholder="task"
                                />
                                <button onClick={() => handleAddATask(todo.id)} className={styles.taskAdd}>+</button>
                            </div>
                            <div key={todo.id}>
                                {todo.content.map((item, index) => (
                                    <li 
                                        key={index} 
                                        className={styles.inputLi}
                                    >
                                        <p
                                            onClick={() => handleClickLi(todo.id, index)}
                                            style={{
                                                textDecoration: item.isStrike ? "line-through" : "none",
                                                cursor: "pointer"
                                            }}
                                        >
                                            {item.text}
                                        </p>
                                        <button className={styles.taskDelete}>x</button>
                                    </li>
                                ))}
                            </div>     
                        </ul>
                        <div className={`${styles.cardBtns} ${styles.cardItems}`}>
                            <button className={styles.cardBtn}>Save</button>
                            <button className={styles.cardBtn}>Cancel</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
            
    )
}