const fs = require('fs');

// Функция для очистки текста от конфиденциальных данных
function cleanText(text) {
    // Регулярные выражения для поиска конфиденциальных данных
    const regexes = [
        /(?<!\.\s)(?<!\.\n)(?<!\.\r\n)\b[A-Z][a-z]*\b(?=\s)/g, // Слова, начинающиеся с заглавной буквы без точки и после которых следует пробел
        /8\(\d{3}\)-\d{3}-\d{2}-\d{2}/g, // Формат номера телефона 8(XXX)-XXX-XX-XX
        /\b\d+°\d+'\b/g,                // Географические координаты в формате XXX°XX'
        /\b\d{6}\b/g                    // Почтовые индексы (шестизначное число)
    ];

    // Заменяем конфиденциальные данные на '[censored]'
    regexes.forEach(regex => {
        text = text.replace(regex, '[censored]');
    });

    return text;
}

// Функция для чтения текста из файла
function readTextFromFile(filename) {
    try {
        // Чтение файла
        const data = fs.readFileSync(filename, 'utf8');
        return data;
    } catch (error) {
        console.error('Ошибка при чтении файла:', error);
        return null;
    }
}

// Пример использования
const filename = 'input.txt'; // Укажите здесь имя файла, из которого нужно прочитать текст
const text = readTextFromFile(filename);
if (text !== null) {
    const cleanedText = cleanText(text);
    console.log(cleanedText);
}
