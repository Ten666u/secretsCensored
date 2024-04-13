const { cleanText } = require('./main.js')

test('Personal Information should be censored', () => {
    expect(cleanText('Меня зовут Максим Бардин, я из Москвы, живу на улице Сеченого'))
        .toBe('Меня зовут [censored] [censored], я из [censored], живу на улице [censored]')
}) 

test('Phone number should be censored', () => {
    expect(cleanText('8(910)-123-45-67')).toBe('[censored]')
}) 

test('Geographic coordinates be censored', () => {
    expect(cleanText("Мои координаты 327°37'")).toBe('Мои координаты [censored]')
}) 

test('Postal code should be censored', () => {
    expect(cleanText('Мой номер 8(910)-123-45-67')).toBe('Мой номер [censored]')
}) 
