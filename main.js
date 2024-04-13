const fs = require('fs');

// Функция для очистки текста от конфиденциальных данных
function cleanText(text) {
    // Регулярные выражения для поиска конфиденциальных данных
    const regexes = [
        /(?<=[a-zа-яё]\s)[A-ZА-ЯЁ][a-zа-яё]*/g, // Удаление персональных данныъ (городов, улиц имен и фамилий)
        /8\(\d{3}\)-\d{3}-\d{2}-\d{2}/g, // Формат номера телефона 8(XXX)-XXX-XX-XX
        /\d*°\d*'/g,                // Географические координаты в формате XXX°XX'
        /\d{6}/g                    // Почтовые индексы (шестизначное число)
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
    fs.writeFileSync('out.txt', cleanedText);
}

module.exports = { cleanText };