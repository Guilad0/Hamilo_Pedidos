var express = require('express');
var router = express.Router();

var connection = require('../database');

router.get('/', (req, res) => {
    var query = `SELECT pedidos.*, productos.nombre_producto AS producto, usuarios.nombre AS vendedor, usuarios.nombre AS cliente FROM pedidos 
                INNER JOIN productos
                ON productos.id = pedidos.producto_id
                INNER JOIN usuarios
                ON usuarios.id = pedidos.vendedor_id`;

    connection.query(query, (error, results, fields) => {
        if (error) {
            console.log(error);
            res.status(500).send({
                error: error,
                message: "Error al realizar la petición"
            });
        } else {
            console.log(results);
            res.status(200).send({
                data: results,
                message: "Listando pedidos"
            });
        }
    })
});

router.post('/', (req, res) => {
    const {producto_id, cliente_id, vendedor_id, comentario, estado, fecha_entrega, coordenadas, direccion} = req.body;
    var query = `INSERT INTO pedidos (producto_id, cliente_id, vendedor_id, comentario, estado, fecha_pedido, fecha_entrega, coordenadas, direccion)
                VALUES ('${producto_id}', '${cliente_id}', '${vendedor_id}', '${comentario}', '${estado}', CURRENT_TIMESTAMP(), '${fecha_entrega}', '${coordenadas}', '${direccion}');`;
    
    connection.query(query, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.status(500).send({
            error: error,
            message: "Error al realizar la peticion",
            });
        } else {
            console.log(results.insertId);
            res.status(200).send({
            data: results.insertId,
            message: "Pedido registrado",
            });
        }
    });

})

router.put('/:id', (req, res, next) => {

    const {producto_id, cliente_id, vendedor_id, comentario, estado, fecha_entrega, coordenadas, direccion} = req.body;

    var query = `UPDATE pedidos SET 
                producto_id = '${producto_id}',
                cliente_id = '${cliente_id}',
                vendedor_id = '${vendedor_id}',
                comentario = '${comentario}',
                estado = '${estado}',
                fecha_entrega = '${fecha_entrega}',
                coordenadas = '${coordenadas}',
                direccion = '${direccion}'
                WHERE id = '${req.params.id}';`;
    connection.query(query, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.status(500).send({
            error: error,
            message: "Error al realizar la peticion",
            });
        } else {
            console.log(results.insertId);
            res.status(200).send({
            data: results.insertId,
            message: "Pedido actualizado",
            });
        }
    });             
});

router.delete('/:id', (req, res, next) => {
    var query = `DELETE FROM pedidos WHERE id = '${req.params.id}';`;
    connection.query(query, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.status(500).send({
            error: error,
            message: "Error al realizar la peticion",
            });
        } else {
            console.log(results.insertId);
            res.status(200).send({
            data: results.insertId,
            message: "Pedido eliminado",
            });
        }
    });             
});

module.exports = router;