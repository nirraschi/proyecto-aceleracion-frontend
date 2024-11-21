import { useState } from 'react'

interface DateSelectorProps {
    onDateChange: (month: string, year: string) => void
}

export default function DateSelector({ onDateChange }: DateSelectorProps) {
    const [selectedMonth, setSelectedMonth] = useState<string>('')
    const [selectedYear, setSelectedYear] = useState<string>('')

    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const month = e.target.value;
        setSelectedMonth(month);
        onDateChange(month, selectedYear); // Formato ajustado en handleDateChange
    };
    

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const year = e.target.value;
        setSelectedYear(year);
        onDateChange(selectedMonth, year); // Formato ajustado en handleDateChange
    };

    return (
        <div>
            <select value={selectedMonth} onChange={handleMonthChange} className="mr-2">
                <option value="">Mes</option>
                <option value="1">Enero</option>
                <option value="2">Febrero</option>
                <option value="3">Marzo</option>
                <option value="4">Abril</option>
                <option value="5">Mayo</option>
                <option value="6">Junio</option>
                <option value="7">Julio</option>
                <option value="8">Agosto</option>
                <option value="9">Septiembre</option>
                <option value="10">Octubre</option>
                <option value="11">Noviembre</option>
                <option value="12">Diciembre</option>
            </select>

            <select value={selectedYear} onChange={handleYearChange}>
                <option value="">Año</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
            </select>
        </div>
    )
}
