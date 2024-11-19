import { NextResponse } from 'next/server'
import { doc, deleteDoc } from 'firebase/firestore'
import { db } from "@/app/lib/firebase"


export async function DELETE(
    request: Request,
    { params }: { params: { id: string }}
) {
    try {
        const { id } = params;
        await deleteDoc(doc(db, 'teamMembers', id))
        return NextResponse.json({ success: true })
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Error al eliminar el elemento' }, { status: 500 })
    }
}