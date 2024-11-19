import { NextResponse } from 'next/server'
import { collection, getDocs, addDoc } from 'firebase/firestore'
import { db } from "@/app/lib/firebase"

export async function GET() {
    try {
        const querySnapshot = await getDocs(collection(db, 'teamMembers'))
        const fetchedMembers = querySnapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name as string
        }))

        return NextResponse.json(fetchedMembers)

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Error al obtener los datos' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const { name } = await request.json()
        const docRef = await addDoc(collection(db, 'teamMembers'), { name })
        return NextResponse.json({ id: docRef.id, name })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Error al agregar el elemento' }, { status: 500 })
    }
}