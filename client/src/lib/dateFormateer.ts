import {format, parseISO, parse} from 'date-fns'

interface DataObject {
    [key: string]: any; // Позволяет объекту иметь любые ключи с любыми значениями
}

export function formatDatesInArray(arr: DataObject[]): DataObject[] { // Форматирует поля с датой у объектов в массиве данных (гггг-мм-дд → дд.мм.гггг)
    return arr.map(item => {
        const formattedItem: DataObject = { ...item };
        for (const key in item) {
            if (typeof item[key] === "string" && /^\d{4}-\d{2}-\d{2}$/.test(item[key])) {
                formattedItem[key] = format(parseISO(item[key]), "dd.MM.yyyy")
            }
        }
        return formattedItem;
    });
}

export function reverseTransformDates(data: DataObject): DataObject { // Форматирует поля с датой у объекта (дд.мм.гггг → гггг-мм-дд)
    const transformedData: DataObject = { ...data };

    for (const key in data) {
        if (typeof data[key] === "string" && /^\d{2}\.\d{2}\.\d{4}$/.test(data[key])) {
            transformedData[key] = format(parse(data[key], "dd.MM.yyyy", new Date()), "yyyy-MM-dd");
        }
    }

    return transformedData;
}

export function transformDate(date: string): string { // Форматирует дату (гггг-мм-дд → дд.мм.гггг)
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return format(parseISO(date), "dd.MM.yyyy");
    }
    return date; // Если формат не подходит, вернуть исходную строку
}

export function reverseTransformDate(date: string): string { // Форматирует дату (дд.мм.гггг → гггг-мм-дд)
    if (/^\d{2}\.\d{2}\.\d{4}$/.test(date)) {
        return format(parse(date, "dd.MM.yyyy", new Date()), "yyyy-MM-dd");
    }
    return date; // Если формат не подходит, вернуть исходную строку
}