const { sequelize } = require('./db')
const { Restaurant, Menu } = require('./models/index')
const {
    seedRestaurant,
    seedMenu,
} = require('./seedData');

describe('Restaurant and Menu Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    });

    test('can create a Restaurant', async () => {
        await Restaurant.bulkCreate(seedRestaurant)
        expect(await Restaurant.findByPk(1)).toEqual(
            expect.objectContaining({
                name: 'AppleBees',
                location: 'Texas',
                cuisine: 'FastFood'

            })
        )
    });

    test('can create a Menu', async () => {
        await Menu.bulkCreate(seedMenu)
        expect(await Menu.findByPk(1)).toEqual(
            expect.objectContaining({
                title: 'Breakfast'
            },)
        )
    });

    test('can update Restaurants', async () => {
        await Restaurant.bulkCreate(seedRestaurant)
        await Restaurant.update({
            cuisine: "Faster Food"
        }, { where: { name: "AppleBees" } })
        expect(await Restaurant.findByPk(1)).toEqual(
            expect.objectContaining({
                name: 'AppleBees',
                location: 'Texas',
                cuisine: 'Faster Food'
            },)
        )
    });

    test('can update Menus', async () => {
        await Menu.bulkCreate(seedMenu)
        await Menu.update({
            title: "Brunch"
        }, { where: { title: "Breakfast" } })
        expect(await Menu.findByPk(1)).toEqual(
            expect.objectContaining({
                title: "Brunch"
            },)
        )
    });

    test('can delete Restaurants', async () => {
        await Restaurant.bulkCreate(seedRestaurant)
        await Restaurant.destroy({where: {id: 1}})
        expect(await Restaurant.findByPk(1)).toEqual(
            null
        )
    });
    test('can delete Menus', async () => {
        await Menu.bulkCreate(seedMenu)
        await Menu.destroy({where: {id: 1}})
        expect(await Menu.findByPk(1)).toEqual(
            null
        )
    });
})