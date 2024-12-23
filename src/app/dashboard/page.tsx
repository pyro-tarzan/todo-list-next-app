"use client";
import React, { useState, useEffect } from "react";
import styles from "@/app/dashboard/dashboardPage.module.scss";

interface Todo {
    id: number;
    title: string;
    content: [];
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
    const [taskValue, setTaskValue] = useState("");

    useEffect(() => {
        const fetchTodos = async() => {
            try{
                const res = await fetch("/apis/all", {
                    method: "GET",
                    headers: { "Content-Type": "application/json"},
                });

                if (res.status === 200){
                    const result: Todo[] = await res.json();
                    setTodos(result);
                }
                
            }
            catch(error){
                console.log(error);
            }
        };

        fetchTodos();
    }, [])
    

    const handleTaskValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskValue(e.target.value);
    }

    const handleCardTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCardTitle(e.target.value);
    };

    const handleAddATask = () => {
        console.log(taskValue);
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
                                            value={`${taskValue}`}
                                            onChange={handleTaskValue}
                                            placeholder="task"
                                        />
                                        <button onClick={handleAddATask} className={styles.taskAdd}>+</button>
                                    </div>
                                        <div key={todo.id} className={styles.inputLi}>
                                            {todo.content.map((item, index) => (
                                                <li key={index}>{item}</li>
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