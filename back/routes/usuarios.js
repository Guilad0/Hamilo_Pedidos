var express = require('express');
var router = express.Router();
var conexion = require('../database');
const e = require('express');
router.get('/', function (req, res, next) {
    var query = "SELECT * FROM usuarios";
    conexion.query(query, function (error, results, fields) {
        if (error) {
            res.status(500).send({
                status: 'error',
                message: error
            })
        } else {
            res.status(200).json({
                data: results,
                cantidad: results.length,
                message: 'Obteniendo usuarios'
            })
        }
    });
})

router.post('/', function (req, res, next) {
    var query = `INSERT INTO usuarios (nombre, correo, telefono, usuario, contraseña, rol, estado) VALUES (?,?,?,?,?,?,?)`;
    var { nombre, correo, telefono, usuario, contraseña, rol, estado } = req.body;
    var values = [nombre, correo, telefono, usuario, contraseña, rol, estado]

    conexion.query(query, values, function (error, results, fields) {
        if (error) {
            res.status(500).send({
                status: 'error',
                message: error
            })
        } else {
            res.status(200).json({
                cantidad: results.length,
                message: 'Se agrego correctamente usuario'
            })
        }
    });
});

router.put('/:id', function (req, res, next) {
    const { id } = req.params;
    var { nombre, correo, telefono, usuario, contraseña, rol, estado } = req.body;
    var query = `UPDATE usuarios SET nombre = '${nombre}', correo = '${correo}', telefono = '${telefono}', usuario = '${usuario}', contraseña = '${contraseña}', rol = '${rol}', estado = '${estado}' WHERE id = ${id}`;
    var queryisEmpty = `SELECT * FROM usuarios WHERE id = ${id}`;
    conexion.query(queryisEmpty, function (error, results, fields) {
        if (results.length == 0) {
            res.status(500).json({
                status: 'error',
                message: 'No se encontro el id'
            })
        } else {
            conexion.query(query, function (error, results, fields) {
                if (error) {
                    res.status(500).send({
                        status: 'error',
                        message: error
                    })
                } else {
                    res.status(200).json({
                        message: 'PUT exitoso'
                    })
                }
            })

        }

    })
});

router.delete('/:id', function (req, res, next) {
    const { id } = req.params;
    var query = `DELETE FROM usuarios WHERE id = ${id}`;
    conexion.query(query, function (error, results, fields) {
        if (error) {
            res.status(500).send({
                status: 'error',
                message: error
            })

        } else {

            res.status(200).json({
                data: results,
                cantidad: results.length,
                message: 'Usuario eliminado'
            })
        }
    })

});

module.exports = router;
