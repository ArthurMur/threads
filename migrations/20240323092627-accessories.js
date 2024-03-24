/* eslint-disable @typescript-eslint/no-var-requires */
const { faker } = require('@faker-js/faker')

// Функция для получения случайного элемента из массива
const getRandomArrayValue = (arr) => arr[Math.floor(Math.random() * arr.length)]

// Определение массивов данных для характеристик одежды
const collections = ['street', 'black']
const colors = ['pink', 'black', 'white', 'gray']
const compositions = ['cotton', 'synthetics', 'polyester']
const accessoryTypes = ['bags', 'caps', 'scarfs']

const images = [
  '/img/accessories/cloth-scarfs-1.png',
  '/img/accessories/cloth-bags-1.png',
  '/img/accessories/cloth-caps-1.png',
  '/img/accessories/cloth-caps-2.png',
]

const wearingMethod = ['in hand', 'on shoulder', 'over shoulder']
const textures = ['nubuck', 'nappa', 'suede', 'naplak']
const styles = ['bucket bag', 'retro style', 'sports', 'travel']
const seasons = ['demi-season', 'all season']

module.exports = {
  async up(db) {
    return db.collection('accessories').insertMany(
      [...Array(50)].map(() => {
        const type =
          accessoryTypes[Math.floor(Math.random() * accessoryTypes.length)]

        const characteristics = [
          {
            type: 'bags',
            color: getRandomArrayValue(colors),
            composition: getRandomArrayValue(compositions),
            collection: getRandomArrayValue(collections),
            wearingMethod: getRandomArrayValue(wearingMethod),
            texture: getRandomArrayValue(textures),
            style: getRandomArrayValue(styles),
          },
          {
            type: 'caps',
            color: getRandomArrayValue(colors),
            composition: getRandomArrayValue(compositions),
            season: getRandomArrayValue(seasons),
          },
          {
            type: 'scarfs',
            color: getRandomArrayValue(colors),
            composition: getRandomArrayValue(compositions),
          },
        ]

        return {
          category: 'accessories',
          type,
          price: +faker.string.numeric(4).replace(/.{0,2}$/, 99),
          name: faker.lorem.sentence(2),
          description: faker.lorem.sentences(10),
          characteristics: characteristics.find((item) => item.type === type),
          images: images.filter((item) => item.includes(type)),
          vendorCode: faker.string.numeric(4),
          inStock: faker.string.numeric(2),
          isBestseller: faker.datatype.boolean(),
          isNew: faker.datatype.boolean(),
          popularity: +faker.string.numeric(3),
        }
      })
    )
  },

  async down(db) {
    return db.collection('accessories').updateMany([])
  },
}
