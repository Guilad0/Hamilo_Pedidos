<template>
    <div>
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <h5 class="card-title">Pedidos</h5>
                    </div>
                    <div class="col-md-6 text-end">
                        <button type="button" class="btn btn-warning" data-bs-toggle="modal"
                            data-bs-target="#modalPedidos">
                            <i class="fa fa-plus"></i>
                            Nuevo
                        </button>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Cliente</th>
                                <th>Producto</th>
                                <th>Vendedor</th>
                                <th>Fecha de pedido</th>
                                <th>Fecha de entrega</th>
                                <th>Comentario</th>
                                <th>Estado</th>
                                <th>Coordenadas</th>
                                <th>Direccion</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in pedidos" :key="item">
                                <td>{{ item.id }}</td>
                                <td>{{ item.cliente }}</td>
                                <td>{{ item.producto }}</td>
                                <td>{{ item.vendedor }}</td>
                                <td>{{ new Date(item.fecha_pedido).toLocaleDateString() }}</td>
                                <td>{{ new Date(item.fecha_entrega).toLocaleDateString() }}</td>
                                <td>{{ item.comentario }}</td>
                                <td>{{ item.estado }}</td>
                                <td>{{ item.coordenadas }}
                                    <a :href="'https://www.google.com/maps/@' + item.coordenadas + ',14.5z'" target="_blank">Ver en mapa</a>
                                </td>
                                <td>{{ item.direccion }}</td>
                                <td>
                                    <button @click="eliminar(item)" class="btn btn-danger btn-sm">
                                        <i class="fa fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>


        <!-- Modal Body -->
        <!-- if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard -->
        <div class="modal fade" id="modalPedidos" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-fullscreen">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">
                            Datos del pedido
                        </h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="card m-1">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <input type="text" id="buscar" class="form-control"
                                                    placeholder="Buscar...">
                                            </div>
                                        </div>
                                        <div class="table-responsive">
                                            <table class="table">
                                                <thead>
                                                    <tr>
                                                        <th>Producto</th>
                                                        <th>Descripcion</th>
                                                        <th>Estado</th>
                                                        <th>Agregar</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="item in productos" :key="item">
                                                        <td>{{item.codigo + ' - ' + item.nombre_producto }}</td>
                                                        <td>{{item.descripcion}}</td>
                                                        <td>{{item.estado}}</td>
                                                        <td>
                                                            <button type="button" @click="agregar(item)" class="btn btn-primary btn-sm">
                                                                <i class="fa fa-plus"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <!-- detalle del pedido  -->
                                <div class="card m-1">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="mb-3">
                                                    <label for="cliente_id" class="form-label">Cliente</label>
                                                    <select v-model="cliente_id" id="cliente_id" class="form-select" required>
                                                        <option value="">Seleccione cliente...</option>
                                                        <option v-for="item in clientes" :key="item" :value="item.id">{{ item.nombre }}</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="mb-3">
                                                    <label for="coordenadas" class="form-label">Coordenadas</label>
                                                    <input type="text" v-model="coordenadas" id="coordenadas" class="form-control" required>
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="mb-3">
                                                    <label for="direccion" class="form-label">Direccion</label>
                                                    <input type="text" v-model="direccion" id="direccion" class="form-control" required>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="mb-3">
                                                        <label for="fecha_pedido" class="form-label">Fecha de
                                                            pedido</label>
                                                        <input type="date" v-model="fecha_pedido" id="fecha_pedido" class="form-control" required>
                                                    </div>
                                                </div>
                                                <div class="col-md-6 ">
                                                    <div class="mb-3">
                                                        <label for="fecha_entrega" class="form-label">Fecha de
                                                            entrega</label>
                                                        <input type="date" v-model="fecha_entrega" id="fecha_entrega" class="form-control" required>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="mb-3">
                                                        <label for="comentario" class="form-label">Comentario</label>
                                                        <input type="text" v-model="comentario" id="comentario" class="form-control" required>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="table-responsive">
                                            <table class="table">
                                                <thead>
                                                    <tr>
                                                        <th>Producto</th>
                                                        <th>Descipcion</th>
                                                        <th>Estado</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="det in detalles" :key="det">
                                                        <td>{{det.nombre}}</td>
                                                        <td>{{ det.descripcion }}</td>
                                                        <td>{{ det.estado }}</td>

                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <GoogleMap
                                            api-key="AIzaSyAtDY3jTFm21OrFaSXjebotMNLKaEkGd3g"
                                            style="width: 100%; height: 500px"
                                            :center="center"
                                            :zoom="15"
                                            >
                                                <Marker :options="{ position: center, draggable: true } " @dragend="obtenerNuevo($event)" />

                                        </GoogleMap>
                                        <div class="text-center">
                                            <button type="button" @click="registrar()" class="btn btn-primary">Guardar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        


        

    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'
import { GoogleMap, Marker } from 'vue3-google-map'

const center =  ref({ lat: 0, lng: 0 });

const route = useRouter()

const pedidos = ref([]);
let baseURL = 'http://localhost:3000/';

const clientes = ref([]);
const productos = ref([]);


const cliente_id = ref('');
const coordenadas = ref('');
const direccion = ref('');
const fecha_pedido = ref('');
const fecha_entrega = ref('');
const comentario = ref('');

const producto_id = ref('');
const vendedor_id = ref('');

const detalles = ref([]);




onMounted(() => {
    obtenerDatos();
    obtenerProductos();
    obtenerClientes();
    miUbicacion();
});

const obtenerDatos = async () => {
    try {
        let url = baseURL + 'pedidos';
        const { data } = await axios.get(url);
        console.log(data);
        pedidos.value = data.data;
    } catch (error) {
        console.log(error);
    }
}

const obtenerProductos = async () => {
    try {
        const { data } = await axios.get(baseURL + 'productos');
        console.log(data);
        productos.value = data.data;
    } catch (error) {
        console.log(error);
    }
}

const obtenerClientes = async () => {
    try {
        const { data } = await axios.get(baseURL + 'usuarios');
        console.log(data);
        clientes.value = data.data;
    } catch (error) {
        console.log(error);
    }
}

const agregar = (item) => {
    const det = {
        producto_id: item.id, 
        nombre: item.codigo + ' - ' + item.nombre_producto,
        descripcion: item.descripcion,
        estado: item.estado,
        cantidad: 1,
    }
    producto_id.value = item.id;
    vendedor_id.value = item.vendedor_id;

    detalles.value.push(det);
}

const registrar = async () => {
    if (cliente_id.value == '' || coordenadas.value == '' || direccion.value == '' || fecha_pedido.value == '' || fecha_entrega.value == '' || comentario.value == '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Todos los campos son obligatorios'
        })
        return;
    }
    const datos = {
        producto_id: producto_id.value,
        vendedor_id: vendedor_id.value,
        cliente_id: cliente_id.value,
        coordenadas: coordenadas.value,
        direccion: direccion.value,
        fecha_pedido: fecha_pedido.value,
        fecha_entrega: fecha_entrega.value,
        comentario: comentario.value,
        detalles: detalles.value,
        estado: 'Pendiente'
    }
    try {
        const { data } = await axios.post(baseURL + 'pedidos', datos);
        console.log(data);
        obtenerDatos();
        obtenerProductos();
        reset();
        var myModalEl = document.getElementById('modalPedidos');
        var modal = bootstrap.Modal.getInstance(myModalEl);
        modal.hide();
    } catch (error) {
        console.log(error);
    }
}

const eliminar = async (item) => {
    if(confirm('¿Desea eliminar el pedido?')){
        try {
            const { data } = await axios.delete(baseURL + 'pedidos/' + item.id);
            obtenerDatos();
            obtenerProductos();
        } catch (error) {
            console.log(error);
            
        }
    }
}

const miUbicacion = () => {
    navigator.geolocation.getCurrentPosition((position) => {
        center.value = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
    })
}

const obtenerNuevo = (param) => {
    console.log(param);
    coordenadas.value = {
        lat: param.latLng.lat(),
        lng: param.latLng.lng()
    }
 
    console.log(coordenadas.value.lat + ',' +coordenadas.value.lng);
 
    coordenadas.value = coordenadas.value.lat + ',' +coordenadas.value.lng;
 
    console.log(coordenadas.value);
}

const reset = () => {
    cliente_id.value = '';
    coordenadas.value = '';
    direccion.value = '';
    fecha_pedido.value = '';
    fecha_entrega.value = '';
    comentario.value = '';
    detalles.value = [];
}
</script>
<style scoped></style>