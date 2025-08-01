import swaggerAutogen from "swagger-autogen"

const doc = {
  info: {
    title: 'My API',
    description: 'Description'
  },
  host: 'localhost:3000'
};

const outputFile = './swagger-output.json';
const routes = ['./index.js', './routes/userRoutes.js', './routes/questionRoutes.js', './routes/siteRoutes.js'];

swaggerAutogen()(outputFile, routes, doc);