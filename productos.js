var express = require("express");
var router = express.Router();
// importamos la coneccion a la base de datos
var conexion = require("../database");

/* GET listar productos. */
router.get("/", function (req, res, next) {
    var numFilas;
    var porPagina = 10;
    var pagina = parseInt(req.query.page, 10) || 1;
    var numPaginas;
    var salto = (pagina - 1) * porPagina;
    var limite = salto + "," + porPagina;

    var queryFilas = "SELECT COUNT(*) AS numFilas FROM productos;";
    conexion.query(queryFilas, function (error, results, fields) {
        numFilas = results[0].numFilas;
        numPaginas = Math.ceil(numFilas / porPagina);

        // creamos la consulta
        var query = "SELECT * FROM productos LIMIT " + limite + ";";

        console.log(query);

        // ejecutamos la consulta
        conexion.query(query, function (error, results, fields) {
            if (error) {
                console.log(error);
                res.status(500).send({
                    error: error,
                    message: "Error al realizar la peticion",
                });
            } else {
                console.log(results);

                var paginacion = {
                    total: numFilas,
                    current: pagina,
                    pages: numPaginas,
                    perPage: porPagina,
                    previous: null,
                    next: null,
                };
                if (pagina <= numPaginas) {
                    paginacion.current = pagina;
                    paginacion.perPage = porPagina;
                    paginacion.previous = pagina > 1 ? pagina - 1 : null;
                    paginacion.next = pagina < numPaginas ? pagina + 1 : null;
                }

                res.status(200).send({
                    data: results,
                    pagination: paginacion,
                    message: "Listando productos",
                });
            }
        });
    });
});

router.post("/store", function (req, res, next) {
    const { codigo, nombre_producto, descripcion, imagen, estado, vendedor_id } =
        req.body;

    var query = `INSERT INTO productos (codigo, nombre_producto, descripcion, imagen, estado, vendedor_id) 
                VALUES ("${nombre}", "${codigo}", "${costo}", "${precio}", "${stock}", "${estado}", "${vendedor_id}");`;

    // ejecutamos la consulta
    conexion.query(query, function (error, results, fields) {
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
                message: "Producto registrado correctamente",
            });
        }
    });
});

router.put("/update/:id", function (req, res, next) {
    const { codigo, nombre_producto, descripcion, imagen, estado, vendedor_id } =
        req.body;

    var query = `UPDATE productos SET codigo = "${codigo}", nombre_producto = "${nombre_producto}", descripcion = "${descripcion}", imagen = "${imagen}", 
estado = "${estado}",  vendedor_id = "${vendedor_id}",
                                     updated_at = CURRENT_TIMESTAMP()
                                 WHERE id = ${req.params.id};`;
    // ejecutamos la consulta
    conexion.query(query, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.status(500).send({
                error: error,
                message: "Error al realizar la peticion",
            });
        } else {
            console.log(results);
            res.status(200).send({
                data: results,
                message: "Producto actualizado correctamente",
            });
        }
    });
});

router.delete('/delete/:id', function(req, res, next) {
   var query = `DELETE FROM productos WHERE id = ${req.params.id};`;

   // ejecutamos la consulta
   conexion.query(query, function (error, results, fields) {
     if(error){
       console.log(error);
       res.status(500).send({
         error: error,
         message: 'Error al realizar la peticion'
       });
     } else {
       console.log(req.params.id);
       res.status(200).send({
         data: req.params.id,
         message: 'Producto eliminado correctamente'
       });
     }
   });
 });




module.exports = router;
