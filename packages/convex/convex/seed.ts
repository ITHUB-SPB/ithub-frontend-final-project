"use node";

import path from 'node:path'
import { readdir, readFile } from 'node:fs/promises';

import { api } from './_generated/api.js';
import { action } from './_generated/server.js';


const loadCharacteristics = async () => {
  const dataDir = path.join(import.meta.url, '..', 'data')
  const filePath = path.join(dataDir, 'characteristics.json')
  const fileContent = await readFile(filePath, { encoding: 'utf-8' })
  return JSON.parse(fileContent)
}

const loadProducts = async () => {
  const dataDir = path.join(import.meta.url, '..', 'data')

  const phonesFiles = await readdir(path.join(dataDir, 'phones'))
  const watchesFiles = await readdir(path.join(dataDir, 'watch'))

  const phonesData = []
  const watchesData = []

  for (const filename of phonesFiles) {
    const fileContent = await readFile(filename, { encoding: 'utf-8' })
    phonesData.push(JSON.parse(fileContent))
  }

  for (const filename of watchesFiles) {
    const fileContent = await readFile(filename, { encoding: 'utf-8' })
    watchesData.push(JSON.parse(fileContent))
  }

  return {
    phonesData,
    watchesData
  }
}


export const seedData = action(async (ctx) => {
  const characteristicsData = await loadCharacteristics()

  for (const { title, measure } of characteristicsData) {
    await ctx.runMutation(api.characteristics.create, { title, measure })
  }

  const { phonesData, watchesData } = await loadProducts()

  for (const product of [...phonesData, ...watchesData]) {
    const {
      raw_price,
      title,
      description,
      category: categoryTitle,
      brand: brandTitle,
      ...characteristics
    } = product

    const brand = await ctx.runQuery(api.brands.getByTitle, { title: brandTitle })
    const brandId = brand === null ? await ctx.runMutation(api.brands.create, { title: brandTitle }) : brand._id

    const category = await ctx.runQuery(api.categories.getByTitle, { title: categoryTitle })
    const categoryId = category === null ? await ctx.runMutation(api.categories.create, { title: categoryTitle }) : category._id

    await ctx.runMutation(api.products.create, {
      brand: brandId,
      category: categoryId,
      current_price: raw_price,
      raw_price,
      title,
      description
    })
  }
});
