import fs from 'fs';
import path from 'path';
import knex from "../config/database";

const getModelFiles = (dir: string) => fs.readdirSync(dir)
    .filter(file => (
        file.indexOf('.') !== 0)
        && (file !== 'index.ts' && file !== 'index.js'))
    .map(file => path.join(dir, file))

const files = getModelFiles(__dirname)

const models = files.reduce((modelsObj: any, filename) => {
    const initModel = require(filename)
    const model = initModel(knex)
    if (model) modelsObj[model.name] = model

    return modelsObj
}, {})

export default models