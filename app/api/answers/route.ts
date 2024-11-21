import { NextResponse } from 'next/server'
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore'
import { db } from "@/app/lib/firebase"

export async function GET(request: Request) {
    try {
        // Obtener la fecha desde los parámetros de la URL o la consulta
        const url = new URL(request.url);
        const dateParam = url.searchParams.get("date"); // Ejemplo de "YYYY-MM"

        // Referencia a la colección "answers"
        const answersRef = collection(db, "answers");

        let querySnapshot;

        if (dateParam) {
            // Si la fecha se proporciona, filtramos por la fecha
            const answersQuery = query(answersRef, where("date", "==", dateParam));
            querySnapshot = await getDocs(answersQuery);
        } else {
            // Si no se proporciona fecha, obtenemos todos los datos
            querySnapshot = await getDocs(answersRef);
        }

        // Mapear los documentos para devolver todos los campos relevantes
        const answers = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return NextResponse.json(answers);

    } catch (error) {
        console.error("Error al obtener las respuestas:", error);
        return NextResponse.json({ error: "Error al obtener las respuestas" }, { status: 500 });
    }
}


export async function POST(request: Request) {
    try{
        const { question, answer, member, date } = await request.json()
        const docRef = await addDoc(collection(db, "answers"), { question, answer, member, date })
        return NextResponse.json({ id: docRef.id, question, answer, member, date })
    } catch (error) {
        console.error("Error al agregar la respuesta:", error);
        return NextResponse.json({ error: "Error al agregar la respuesta" }, { status: 500 });
    }
}

