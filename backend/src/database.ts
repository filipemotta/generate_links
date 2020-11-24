import {Sequelize} from 'sequelize';

const sequelize = new Sequelize('mysql://root:docker@localhost:3306/generate_links');

export default sequelize;