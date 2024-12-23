import { NextResponse } from "next/server";

export const todos = [
    {
        id: 1,
        title: "Learn Next.ts",
        content: ["Understand basics", "Learn API routes", "Build a project"],
        date: { date: 23, month: 12, year: 2024 },
        important: false
    },
    {
        id: 2,
        title: "Groceries",
        content: ["Potato", "Tomato", "Onion", "Cucumber"],
        date: { date: 23, month: 12, year: 2024 },
        important: false
    },
    {
        id: 3,
        title: "Create TodoList",
        content: ["Set up home page", "Create a app routing", "Use common Navigation bar and interactive"],
        date: { date: 23, month: 12, year: 2024 },
        important: false
    }
];

export async function GET(){
    return NextResponse.json(todos);
}