var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var conexion = require('../database');

/* GET users listing. */
router.get("/", function (req, res, next) {
  console.log("Peticion de usuarios asca");
  var query = 'SELECT * FROM usuarios';

  conexion.query(query, function(error, results, fields) {
    if(error){
      console.log(error);
      res.status(500).send({ 
        error: error,
        message: 'Error al realizar la peticion' 
      })
    } else {
      console.log(results);
      res.status(200).send({
        data: results,
        message: 'Listando usuarios'
      })
    }
  });

  // res.send("Respuesta desde usuarios: hola mundo acasc acasc");
});


router.post('/store', async function (req, res, next) {

  const {nombre, correo, telefono, usuario, password, rol } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const query = `INSERT INTO usuarios (nombre, correo, telefono, usuario, password, rol)
              VALUES ("${nombre}", "${correo}", "${telefono}", "${usuario}", "${hashedPassword}", "${rol}");`;

  conexion.query(query, function (error, results, fields) {
    if (error) {
      console.log(error);
      res.status(500).send({
        error: error,
        message: 'Error en la consulta',
      });
    } else {
      console.log(results);
      res.status(200).send({
        data: results,
        message: 'Usuario registrado',
      });
    }
  });
});

module.exports = router;
