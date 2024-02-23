// import { DataTypes } from 'sequelize';
// import { Sequelize } from 'sequelize-typescript';
// import type { MigrationFn } from 'umzug';

// export const up: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
//   await sequelize.getQueryInterface().createTable('orderProducts', {
//     id: {
//       type: DataTypes.STRING(255),
//       primaryKey: true,
//       allowNull: false
//     },
//     order_id: {
//       type: DataTypes.STRING(255),
//       allowNull: false
//     },
//     name: {
//       type: DataTypes.STRING(255),
//       allowNull: false
//     },
//     description: {
//       type: DataTypes.STRING(255),
//       allowNull: false
//     },
//     salesPrice: {
//       type: DataTypes.NUMBER,
//       allowNull: false
//     }
//   })
// };
// export const down: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
//   await sequelize.getQueryInterface().dropTable('orderProducts')
// };
