const superagent = require('superagent');
const log = console.log;
const chalk = require('chalk');
const fs = require('fs');






function escribirDatosMuseo(error, res) {

  const museos = res.body.results;

  const datos = museos.map(m => {
    return ('museos.txt', `${m.nombre} (${m.direccion}). por cualquier consulta comunicarse al ${m.telefono} \n`);
  });

  fs.writeFile('museos2.txt', datos, (error) => {
    if (error) {
      throw new Error('algo se rompió', error);
    }
  })


}


function imprimirDatosMuseo(error, res) {

  const museos = res.body.results;

  museos.forEach(museo => {

    //desestructuracion de objetos
    const { nombre, direccion, telefono } = museo;

    fs.appendFile('museos.txt', `${nombre} (${direccion}). por cualquier consulta comunicarse al ${telefono} \n`,
      () => {
        if (error)
          throw new Error("ups");
      });
  })

}


superagent
  .get('https://www.cultura.gob.ar/api/v2.0/museos')
  .query({ format: 'json' })
  .end(escribirDatosMuseo);



