import Sequelize from 'sequelize';

//sequelize instance will connect to our database
const sequelize = new Sequelize('slack', 'postgres', 'postgres');

const models = {
    user: sequelize.import('./user'),
    channel: sequelize.import('./channel'),
    member: sequelize.import('./member'),
    message: sequelize.import('./message'),
    team: sequelize.import('./team'),
};


Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

 export default models;