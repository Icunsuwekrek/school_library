'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("books",[
      {
        name:'Soekarno', gender:'Male',
        contact:'021-223311', address:'Tokyo,Japan',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name:'Soekarno', gender:'Male',
        contact:'0331-474747', address:'Beijing, China',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name:'Megawati', gender:'Female',
        contact:'091-23981', address:'Bangkok,Thailand',
        createdAt: new Date(), updatedAt: new Date()
      },
    ], {})
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('books',null, {});
  }
};
