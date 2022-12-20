const faker = require("faker");

export const generateFakeUserData = () => ({
  email: {
    correct: faker.internet.email().toLowerCase(),
    withoutAtSign: faker.lorem.words(1),
    withoutDomain: `${faker.lorem.words(1)}@`,
  },
  password: {
    correct: faker.internet.password(10, false, /^[A-Za-z]*$/, '8Aa!'),
    tooShort: faker.internet.password(9, false, /^[A-Za-z]*$/, '8Aa!'),
    lackOfSymbol: faker.internet.password(10, false, /^[A-Za-z]*$/, '8Aa'),
    lackOfUpperCase: faker.internet.password(10, false, /^[a-z]*$/, '8a!'),
    lackOfNumber: faker.internet.password(10, false, /^[A-Za-z]*$/, 'Aa!'),
  },
  firstName: {
    correct: faker.name.firstName(),
  },
  lastName: {
    correct: faker.name.lastName(),
  },
  postiion: {
    correct: faker.company.companyName(),
  },
  phoneNumber: {
    correct: faker.phone.phoneNumber('+48791######'),
  },
})