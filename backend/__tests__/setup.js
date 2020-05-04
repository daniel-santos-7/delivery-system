const { sequelize } = require('../src/models');

const truncate = ()=> {
    return Promise.all(Object.keys(sequelize.models).map(key => {
        return sequelize.models[key].destroy({ where:{}, force:true });
    }));
}

beforeAll(async ()=> {
    await truncate();
});

afterAll(async ()=> {
    await sequelize.close();
});