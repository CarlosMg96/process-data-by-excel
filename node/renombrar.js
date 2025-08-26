const fs = require('fs');
const path = require('path');

// Ruta de la carpeta que quieres procesar
const carpetaObjetivo = '/#';

function reemplazarEspaciosPorGuiones(dir) {
  // Leer todos los elementos de la carpeta
  fs.readdirSync(dir).forEach(nombreViejo => {
    const rutaVieja = path.join(dir, nombreViejo);

    // Verificar si es archivo o carpeta
    const stats = fs.statSync(rutaVieja);

    // Nuevo nombre con espacios reemplazados por guiones
    const nombreNuevo = nombreViejo.replace(/ /g, '-');
    const rutaNueva = path.join(dir, nombreNuevo);

    // Si el nombre cambió, renombramos
    if (nombreViejo !== nombreNuevo) {
      fs.renameSync(rutaVieja, rutaNueva);
      console.log(`Renombrado: ${nombreViejo} ➜ ${nombreNuevo}`);
    }

    // Si es una carpeta, procesarla recursivamente
    if (stats.isDirectory()) {
      reemplazarEspaciosPorGuiones(rutaNueva);
    }
  });
}

// Ejecutar la función
reemplazarEspaciosPorGuiones(carpetaObjetivo);
