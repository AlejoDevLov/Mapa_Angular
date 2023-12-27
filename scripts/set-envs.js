// Configuracion de NODE para crear automaticamente archivo de variables de entorno


const { writeFileSync, mkdirSync } = require('fs');

// configuracion dependencia DOTENV
require('dotenv').config();

// Ruta donde se debe crear el archivo
const targetPath = './src/environments/environment.ts';

// Contenido del archivo de la variable de entorno
const envFileContent = `
  export const environment = {
    API_KEY: "${ process.env['MAPTILER_KEY'] }",
  };
`;


// Crea directorio y si ya existe, lo sobreescribe
mkdirSync('./src/environments', { recursive: true });

// Crea el archivo en la ruta indicada con el contenido indicado en el segundo argumento
writeFileSync( targetPath, envFileContent );
