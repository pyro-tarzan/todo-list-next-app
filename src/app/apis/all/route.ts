import { NextResponse } from "next/server";
import { query } from "@/app/lib/db";

export async function GET(){
    try{
        const tasks = await query(
            "SELECT t.id, t.title, t.date, t.important, \
            json_agg(json_build_object('text', c.text, 'is_strike', c.is_strike)) AS content \
            FROM tasks t \
            LEFT JOIN contents c ON t.id = c.task_id \
            GROUP BY t.id;"
        );
        return NextResponse.json(tasks);
    }
    catch( error ){
        return NextResponse.json({error: "Internal server error."});
    }
}