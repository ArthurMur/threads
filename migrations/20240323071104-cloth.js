/* eslint-disable @typescript-eslint/no-var-requires */
const { faker } = require('@faker-js/faker')

// Функция для получения случайного элемента из массива
const getRandomArrayValue = (arr) => arr[Math.floor(Math.random() * arr.length)]

// Определение массивов данных для характеристик одежды
const collections = ['street', 'black']
const colors = ['pink', 'black', 'white', 'gray']
const compositions = ['cotton', 'synthetics', 'polyester']
const clothTypes = ['t-shirts', 'long-sleeves', 'hoodie', 'outerwear']
const fabricTypes = [
  'natural',
  'non-natural',
  'mixed',
  'non-woven',
  'stockinette',
]
const features = [
  'breathable material, knitwear',
  'contrasting color',
  'soft fabric',
  'hood, pockets',
]
const collars = [
  'polo',
  'shirt-rack',
  'apache',
  'tangerine',
  'golf',
  'round neck',
]
const sleeves = ['long', 'short']
const seasons = ['demi-season', 'all season']
const upperMaterials = [
  'synthetic material',
  'quilted jacket fabric',
  'eco leather',
  'denim',
]
const liningMaterials = ['taffeta', 'viscose', 'polyester', 'chiffon', 'satin']

const images = [
  '/img/clothes/cloth-hoodie-1.png',
  '/img/clothes/cloth-hoodie-2.png',
  '/img/clothes/cloth-hoodie-3.png',
  '/img/clothes/cloth-longsleeve-1.png',
  '/img/clothes/cloth-longsleeve-2.png',
  '/img/clothes/cloth-tshirt-1.png',
  '/img/clothes/cloth-tshirt-2.png',
  '/img/clothes/cloth-tshirt-3.png',
  '/img/clothes/cloth-tshirt-4.png',
  '/img/clothes/cloth-tshirt-5.png',
]

const lineImages = ['/img/tshirt1.png', '/img/tshirt2.png', '/img/tshirt3.png']

module.exports = {
  async up(db) {
    return db.collection('cloth').insertMany(
      [...Array(50)].map(() => {
        const type = clothTypes[Math.floor(Math.random() * clothTypes.length)]
        const characteristics = [
          {
            type: 't-shirts',
            color: getRandomArrayValue(colors),
            collar: getRandomArrayValue(collars),
            silhouette: 'straight',
            print: 'chocolate, print, melange',
            decor: faker.datatype.boolean(),
            composition: getRandomArrayValue(compositions),
            season: getRandomArrayValue(seasons),
            collection:
              collections[Math.floor(Math.random() * collections.length)],
          },
          {
            type: 'long-sleeves',
            color: getRandomArrayValue(colors),
            collar: getRandomArrayValue(collars),
            silhouette: 'straight',
            print: 'chocolate, print, melange',
            decor: faker.datatype.boolean(),
            composition: getRandomArrayValue(compositions),
            features: getRandomArrayValue(features),
            fabricType: getRandomArrayValue(fabricTypes),
            sleeve: getRandomArrayValue(sleeves),
            season: getRandomArrayValue(seasons),
            collection:
              collections[Math.floor(Math.random() * collections.length)],
          },
          {
            type: 'hoodie',
            color: getRandomArrayValue(colors),
            collar: getRandomArrayValue(collars),
            silhouette: 'straight',
            print: 'chocolate, print, melange',
            decor: faker.datatype.boolean(),
            composition: getRandomArrayValue(compositions),
            features: getRandomArrayValue(features),
            fabricType: getRandomArrayValue(fabricTypes),
            sleeve: getRandomArrayValue(sleeves),
            clasp: faker.datatype.boolean(),
            season: getRandomArrayValue(seasons),
          },
          {
            type: 'outerwear',
            color: getRandomArrayValue(colors),
            collar: getRandomArrayValue(collars),
            decor: faker.datatype.boolean(),
            composition: getRandomArrayValue(compositions),
            features: getRandomArrayValue(features),
            upperMaterial: getRandomArrayValue(upperMaterials),
            liningMaterial: getRandomArrayValue(liningMaterials),
            collection:
              collections[Math.floor(Math.random() * collections.length)],
          },
        ]
        const currentCharacteristics = characteristics.find(
          (item) => item.type === type
        )

        return {
          category: 'cloth',
          type,
          price: +faker.string.numeric(4).replace(/.{0,2}$/, 99),
          name: faker.lorem.sentence(2),
          description: faker.lorem.sentences(10),
          characteristics: currentCharacteristics,
          images:
            type === 't-shirts' && currentCharacteristics.collection === 'line'
              ? [getRandomArrayValue(lineImages)]
              : images.filter((item) => item.includes(type)),
          vendorCode: faker.string.numeric(4),
          inStock: faker.string.numeric(2),
          isBestseller: faker.datatype.boolean(),
          isNew: faker.datatype.boolean(),
          popularity: +faker.string.numeric(3),
          sizes: {
            s: faker.datatype.boolean(),
            l: faker.datatype.boolean(),
            m: faker.datatype.boolean(),
            xl: faker.datatype.boolean(),
            xxl: faker.datatype.boolean(),
          },
        }
      })
    )
  },

  async down(db) {
    return db.collection('cloth').updateMany([])
  },
}
