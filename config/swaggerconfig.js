//MARK: - Modules
const swaggerUi = require('swagger-ui-express')
const swaggereJsdoc = require('swagger-jsdoc')

//MARK: - Properties
const options = {
    swaggerDefinition: {
        openapi: "3.0.3",
        info: {
            title: "Camper's API",
            version: '1.0.0',
            description: "Camper's API with express",
        },
        host: 'localhost:3000',
        basePath: '/'
    },
    apis: ['./routes/*.js']
}

const specs = swaggereJsdoc(options)

//MARK: - Exports
module.exports = {
    swaggerUi,
    specs
}