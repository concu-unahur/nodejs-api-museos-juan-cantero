const superagent = require('superagent');
const log = console.log;
const chalk = require('chalk');
const fs = require('fs');






function escribirDatosLugar(error, res) {

  console.log('descargando lugares')
  const lugar = cargarLugar(res);

  const datos = cargarDatosDeLugar(lugar);
  console.log('cargando lugares');
  fs.appendFile('lugares.txt', datos, (error) => {
    if (error) {
      throw new Error('algo se rompió', error);
    }
  })
  console.log('terminado');


}

function leerDatosLugar() {
  fs.readFile('lugares.txt', (error, data) => {
    if (error) {
      throw new Error('no existe el archivo', error);
    }
    console.log(chalk.green(data.toString()));
  });
}

function cargarDatosDeLugar(lugar) {
  return lugar.map(l => {
    return `${l.nombre} (${l.direccion}). Por cualquier consulta comunicarse al ${l.telefono} \n`;
  })
}

function cargarLugar(res) {
  return res.body.results;
}








const escribirMuseo = () => {
  superagent
    .get('https://www.cultura.gob.ar/api/v2.0/museos')
    .query({ format: 'json' })
    .end(escribirDatosLugar);
};

const escribirOrganismo = () => {
  superagent
    .get('https://www.cultura.gob.ar/api/v2.0/organismos')
    .query({ format: 'json' })
    .end(escribirDatosLugar);
};


escribirOrganismo();
leerDatosLugar();



