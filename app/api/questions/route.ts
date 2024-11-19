import { NextResponse } from 'next/server'
import { collection, getDocs, addDoc } from 'firebase/firestore'
import { db } from "@/app/lib/firebase"

export async function GET() {

    try {
        const querySnapshot = await getDocs(collection(db, 'questions'))
        const fetchedQuestions = querySnapshot.docs.map(doc => ({
            id: doc.id,
            text: doc.data().text as string
        }))

        return NextResponse.json(fetchedQuestions)

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Error al obtener los datos' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const { text } = await request.json();

        if (!text) {
            return NextResponse.json(
                { error: 'El campo "text" es requerido' },
                { status: 400 }
            );
        }

        const docRef = await addDoc(collection(db, "questions"), { text });
        return NextResponse.json({ id: docRef.id, text });

    } catch (error) {
        console.error("Error al agregar la pregunta:", error);
        return NextResponse.json(
            { error: "Error al agregar la pregunta" },
            { status: 500 }
        );
    }
}

