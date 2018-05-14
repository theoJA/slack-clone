import Sequelize from 'sequelize';

//sequelize instance will connect to our database
// entire index.js code taken directly from express-example/models/index.js
const sequelize = new Sequelize('slack', 'postgres', 'postgres', {
    dialect: 'postgres',
    define: {
      underscored: true, 
    },
});

const models = {
    User: sequelize.import('./user'),
    Channel: sequelize.import('./channel'),
    Message: sequelize.import('./message'),
    Team: sequelize.import('./team'),
};


Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;