const { faker } = require('@faker-js/faker');

export const acceptableEmails = [
  'george.bluth@reqres.in',
  'janet.weaver@reqres.in',
  'emma.wong@reqres.in',
  'eve.holt@reqres.in',
  'charles.morris@reqres.in',
  'tracey.ramos@reqres.in'
];

export const getRandomEmail = () => {
  return acceptableEmails[Math.floor(Math.random() * acceptableEmails.length)];
};

export const generateInvalidEmail = () => {
  return `${faker.internet.userName()}@invalid.com`;
};

// Function to generate a random valid user ID (1-12)
export const getRandomValidUserId = () => {
  return Math.floor(Math.random() * 12) + 1;
};

