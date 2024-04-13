const { cleanText } = require('./main.js')

test('Phone number should be censored', () => {
    expect(cleanText('8(910)-123-45-67')).toBe('[censored]')
}) 