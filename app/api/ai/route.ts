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
                    content: `Actúa como un asistente especializado en análisis para las retrospectivas mensuales. Tu objetivo es proporcionar información útil basada en los datos disponibles. Responde de manera clara, concisa y con enfoque en la acción. Tienes acceso a los datos de participación de usuarios, respuestas del equipo y registros históricos. Cumple con las siguientes funcionalidades:

                
                Clasifica las respuestas de los usuarios en tres categorías:
                a) Cosas que se hicieron mal.
                b) Cosas a mejorar.
                c) Posibles acciones a tomar para abordar lo que se hizo mal.
                
                Resumen Mensual de Retrospectiva

                Proporciona un resumen que destaque los aspectos clave:
                a) Logros destacados del equipo.
                b) Áreas de mejora.
                c) Recomendaciones prácticas para futuros ciclos.
                Instrucciones Adicionales
                Siempre utiliza un lenguaje profesional y orientado a equipos SCRUM.
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
