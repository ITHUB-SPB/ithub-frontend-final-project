import path from 'node:path'
import { readdir, readFile } from 'node:fs/promises';
import { db } from './connection';


const loadCharacteristics = async () => {
  const dataDir = path.join(import.meta.filename, '..', '..', 'data')
  const filePath = path.join(dataDir, 'characteristics.json')
  const fileContent = await readFile(filePath, { encoding: 'utf-8' })
  return JSON.parse(fileContent)
}

const loadCategories = async () => {
  const dataDir = path.join(import.meta.filename, '..', '..', 'data')
  const filePath = path.join(dataDir, 'categories.json')
  const fileContent = await readFile(filePath, { encoding: 'utf-8' })
  return JSON.parse(fileContent)
}

const loadProducts = async () => {
  const dataDir = path.join(import.meta.filename, '..', '..', 'data')

  const phonesFiles = await readdir(path.join(dataDir, 'phones'))
  const watchesFiles = await readdir(path.join(dataDir, 'watch'))

  const phonesData = []
  const watchesData = []

  for (const filename of phonesFiles) {
    const filePath = path.join(import.meta.filename, '..', '..', 'data', 'phones', filename)

    const fileContent = await readFile(filePath, { encoding: 'utf-8' })
    phonesData.push(JSON.parse(fileContent))
  }

  for (const filename of watchesFiles) {
    const filePath = path.join(import.meta.filename, '..', '..', 'data', 'watch', filename)

    const fileContent = await readFile(filePath, { encoding: 'utf-8' })
    watchesData.push(JSON.parse(fileContent))
  }

  return {
    phonesData,
    watchesData
  }
}


export const seedData = async () => {
  const characteristicsData = await loadCharacteristics()
  const categoriesData = await loadCategories()

  for (const { title, measure } of characteristicsData) {
    await db.insertInto('characteristics').values({ title, measure }).execute()
  }

  for (const { title, value, active } of categoriesData) {
    await db.insertInto('categories').values({
      title,
      value,
      active: active ? 1 : 0
    }).execute()
  }

  const { phonesData, watchesData } = await loadProducts()

  for (const product of [...phonesData, ...watchesData]) {
    const {
      rawPrice,
      title,
      description,
      category: categoryValue,
      brand: brandTitle,
      ...characteristics
    } = product

    let brandId: number;

    const brand = await db.selectFrom('brands').selectAll().where('brands.title', '==', brandTitle).executeTakeFirst()

    if (brand) {
      brandId = brand.id
    } else {
      const createdBrand = await db.insertInto('brands').values({ title: brandTitle }).returning('brands.id').executeTakeFirst()
      brandId = createdBrand!.id
    }

    const category = await db.selectFrom('categories').selectAll().where('categories.value', '==', categoryValue).executeTakeFirstOrThrow()

    await db.insertInto('products').values({
      brandId,
      categoryId: category.id,
      currentPrice: rawPrice,
      rawPrice,
      title,
      description
    }).execute()
  }
};

await seedData()