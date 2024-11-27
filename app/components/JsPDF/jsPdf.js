import { jsPDF } from "jspdf";

export const generatePDF = (data, selectedDate) => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "normal");
    doc.setFontSize(13);

    // Cabecera
    doc.setTextColor(40, 50, 80); // Color de texto para la cabecera
    doc.text('Reporte Retrospectiva', 14, 20);
    doc.setLineWidth(0.25);
    doc.line(14, 23, 200, 23); // linea divisoria debajo de la cabecera

    // fecha
    if (selectedDate) {
        doc.setFontSize(10);
        doc.text(`Fecha de retrospectiva: ${selectedDate}`, 14, 28);
    }
    //psocion incial debajo de la cabecera, altura de la pagina y margen inferior.
    let yPosition = 35; 
    const pageHeight = doc.internal.pageSize.height; 
    const marginBottom = 20; 

    data.forEach((item, index) => {
        // Verificar si se necesita una nueva página (no creaba paginas)
        if (yPosition + 20 > pageHeight - marginBottom) {
            doc.addPage();
            yPosition = 20; // Restablece la posición para la nueva página
        }

        // Número de pregunta
        doc.setFontSize(11);
        doc.setTextColor(50, 50, 50); // Color de texto gris 
        doc.text(`${index + 1}.`, 14, yPosition);

        // Nombre
        doc.setFontSize(11);
        doc.setTextColor(0, 102, 204); // Color azul 
        doc.text(`Nombre: ${item.member}`, 20, yPosition);
        yPosition += 8;

        // Pregunta
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0); // Color negro 
        doc.text(`Pregunta: ${item.question}`, 20, yPosition);
        yPosition += 8;

        // Respuesta
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100); // Color gris 
        const answerLines = doc.splitTextToSize(item.answer, 180); // Ajuste del ancho de la respuesta
        answerLines.forEach((line) => {
            doc.text(line, 20, yPosition);
            yPosition += 6; // Espaciado entre las líneas
        });

        // Línea divisoria
        doc.setLineWidth(0.2);
        doc.setDrawColor(200, 200, 200); // Color gris claro
        doc.line(14, yPosition, 200, yPosition);
        yPosition += 5; // Deja espacio entre las líneas divisorias
    });

    // Pie de página
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150); // Color gris 
    doc.text(`Generado el ${new Date().toLocaleDateString()}`, 14, pageHeight - 10);

    // Nombre del archivo
    const dateStr = selectedDate ? selectedDate.replace("-", "") : "sin-fecha";
    doc.save(`retrospectiva_${dateStr}.pdf`);
};
