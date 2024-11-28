import { NextResponse } from "next/server";
import { db } from "@/app/lib/firebase";
import {  updateDoc, deleteDoc, doc } from "firebase/firestore";

// put y delete

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const { text } = await request.json()
        await updateDoc(doc(db, 'questions', id), { text })
        return NextResponse.json({ id, text })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Error al actualizar la pregunta' }, { status: 500 })
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await deleteDoc(doc(db, 'questions', id))
        return NextResponse.json({ success: true })
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Error al eliminar el elemento' }, { status: 500 })
    }
}