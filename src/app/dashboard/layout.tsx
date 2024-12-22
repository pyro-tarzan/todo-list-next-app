"use client";
import {useState} from "react";
import SideNavigation from "../ui/dashboard/navigation";
import styles from "@/app/dashboard/dashboardLayout.module.scss";
import { TodosProvider, useTodos } from "../context/TodosContext";

interface Todo {
    id: number;
    title: string;
    content: [];
}

export default function DashboardLayout({children}: {children: React.ReactNode}){
    const [cardTitle, setCardTitle] = useState("");

    const handleCardTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCardTitle(e.target.value);
    };

    const handleCreateCard = () => {
        if (cardTitle.trim()) {
          console.log("Create card:", cardTitle); // Here you can call a function to save the card
          setCardTitle("");
        }
    };

    const handleNewTaskClick = async() => {
        if (!cardTitle.trim()){
            alert("Title is required.");
            return ;
        }

        const newTodo: Todo = {id: Date.now(), title: cardTitle, content: []};
        useTodos().addTodo(newTodo);
        setCardTitle("");

        // const res = await fetch("/api/todos", {
        //     method: "POST",
        //     headers: {"Content-Type": "application/json"},
        //     body: JSON.stringify(newTodo)
        // });

        // const data = await res.json();
        // if (res.status === 200){
        //     setTodos([...todos, newTodo]);
        //     setCardTitle("");
        // }
        // else {
        //     alert(data.error || "Error adding todo");
        // }
      };

    return (
        <TodosProvider>
            <div className="dashboard">
                <div className={styles.dashboardLayout}>
                    <div className={styles.navigationPadding}>
                        <SideNavigation />
                    </div>

                    <div className={styles.dashboardContent}>
                        <div className={styles.cardPanel}>
                            <div className={styles.panelCont}>
                                <div className={styles.panel}>
                                    <input 
                                        type="text" 
                                        className={styles.inputFile}
                                        value={cardTitle}
                                        onChange={handleCardTitleChange} 
                                        onKeyDown={(e) => e.key === "Enter" && handleCreateCard()}
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
                                {children}
                            </div>
                        </div>
                    </div>
                </div>                 
            </div>
        </TodosProvider> 
    )
}