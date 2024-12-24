import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try{
        const newTodo = await req.json();
        if ( !newTodo.id || !newTodo.title ) {
            return NextResponse.json(
                { error: "Invalid data. Missing required fields." },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: "Todo task added successfully." },
            { status: 200 }
        );
    }
    catch ( error ) {
        console.log(error);
        return NextResponse.json(
            { error: "Failed to process request."},
            { status: 500 }
        );
    }  
}