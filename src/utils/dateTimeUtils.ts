export class DateTimeUtils {
    // Formatear una fecha en un formato específico
    static formatDate(date: Date, format: string): string {
        const map: { [key: string]: string } = {
            dd: date.getDate().toString().padStart(2, '0'),
            mm: (date.getMonth() + 1).toString().padStart(2, '0'),
            yyyy: date.getFullYear().toString(),
            hh: date.getHours().toString().padStart(2, '0'),
            MM: date.getMinutes().toString().padStart(2, '0'),
            ss: date.getSeconds().toString().padStart(2, '0'),
        };

        return format.replace(/dd|mm|yyyy|hh|MM|ss/gi, matched => map[matched]);
    }

    // Obtener la fecha y hora actual
    static getCurrentDateTime(): string {
        return new Date().toISOString();
    }

    // Convertir una fecha a un formato ISO
    static toISODate(date: Date): string {
        return date.toISOString().split('T')[0];
    }

    // Agregar días a una fecha
    static addDays(date: Date, days: number): Date {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    // Restar días a una fecha
    static subtractDays(date: Date, days: number): Date {
        const result = new Date(date);
        result.setDate(result.getDate() - days);
        return result;
    }

    // Comparar dos fechas (sin considerar la hora)
    static compareDates(date1: Date, date2: Date): number {
        const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
        const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
        return d1.getTime() - d2.getTime();
    }

    // Verificar si una fecha es válida
    static isValidDate(date: string): boolean {
        const parsedDate = new Date(date);
        return !isNaN(parsedDate.getTime());
    }
}

export const formatDate = (date: Date): string => {
    return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
};

export const formatTime = (date: Date): string => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // La hora '0' debe ser '12'
    const strTime = `${hours}:${minutes} ${ampm}`;
    return strTime;
};

