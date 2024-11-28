import { NextResponse } from 'next/server'
import { CohereClientV2 } from "cohere-ai";


export async function POST(request: Request) {
    const { prompt } = await request.json()
    try {
        const cohere = new CohereClientV2({
            token: process.env.COHERE_APIKEY,
        });
        const response = await cohere.chat({
            model: 'command-r-plus-08-2024',
            messages: [
                {
                    role: 'system',
                    content: `Actúa como un asistente especializado en análisis de retrospectivas mensuales para equipos SCRUM. 
                    Tu objetivo es generar valor mediante el análisis y la presentación de información accionable basada en los datos proporcionados. 
                    Tienes acceso a datos de participación de usuarios, respuestas del equipo y registros históricos. Cumple con las siguientes funcionalidades:

                    Clasificación de Respuestas
                    Cosas que se hicieron mal: Identifica los problemas o errores más relevantes señalados por el equipo.
                    Cosas a mejorar: Destaca áreas específicas donde el equipo puede enfocarse para optimizar su desempeño.
                    Posibles acciones: Propón soluciones prácticas para abordar las áreas problemáticas y los puntos de mejora identificados.
                    Instrucciones Adicionales
                    El texto que entregues, tiene que ser ordenado, sin espacios innecesarios y con saltos de línea para facilitar su lectura. Sin caracteres especiales innecesarios. Sin decoraciones de texto, como negritas, o cursivas.
                    Utiliza un lenguaje profesional, claro y directo, adaptado a equipos SCRUM.
                    Prioriza un enfoque práctico y orientado a la acción.
                    Asegúrate de destacar patrones, tendencias y oportunidades para la mejora continua.              
`,
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
        });


        return NextResponse.json(response.message);
    } catch {

        return NextResponse.json({ error: 'Error al generar el reporte' }, { status: 500 });

    }
}
