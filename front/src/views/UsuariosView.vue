<template>
    <div class="card">
        <div class="card-body">

            <div class="row">
                <div class="col-md-6">
                    <h5 class="card-title">Usuarios</h5>
                </div>
                <div class="col-md-6 text-end">
                    <button type="button" class="btn btn-warning" data-bs-toggle="modal"
                        data-bs-target="#modalUsuarios">
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
                            <th>Nombres</th>
                            <th>Apellidos</th>
                            <th>Correo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in usuarios" :key="item">
                            <td>{{ item.id }}</td>
                            <td>{{ item.nombres }}</td>
                            <td>{{ item.apellidos }}</td>
                            <td>{{ item.correo }}</td>
                            <td>
                                <!-- <a href="#" class="btn btn-primary btn-sm">
                                    <i class="fa fa-eye"></i>
                                </a> -->
                                <button @click="seleccionar(item)" class="btn btn-warning btn-sm">
                                    <i class="fa fa-edit"></i>
                                </button>
                                <!-- <button v-if="item.estado" @click="estado(item.id)" class=" btn btn-danger btn-sm">
                                    <i class="fa fa-ban"></i>
                                </button>
                                <button v-else @click="estado(item.id)" class=" btn btn-primary btn-sm">
                                    <i class="fa fa-check"></i>
                                </button>
                                <button v-if="item.estado==0" @click="eliminar(item.id)" class=" btn btn-danger btn-sm">
                                    <i class="fa fa-trash"></i>
                                </button> -->

                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>

        </div>
    </div>

    <div class="modal fade" id="modalUsuarios" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Datos del cliente</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form action="#" class="needs-validation" novalidate>
                    <div class="modal-body">

                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="nombre" class="form-label">Nombre</label>
                                    <input type="text" v-model="nombre" id="nombre" class="form-control" required />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="correo" class="form-label">Correo</label>
                                    <input type="email" v-model="correo" id="correo" class="form-control"
                                        placeholder="example@example.com" />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="telefono" class="form-label">Telefono</label>
                                    <input type="text" v-model="telefono" id="telefono" class="form-control"
                                        required />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="usuario" class="form-label">Usuario</label>
                                    <input type="text" v-model="usuario" id="usuario" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="password" class="form-label">Password</label>
                                    <input type="password" v-model="password" id="password" class="form-control"
                                        placeholder="********" required />

                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="rol" class="form-label">Rol</label>
                                    <select v-model="rol" id="rol" class="form-select">
                                        <option value="">Seleccione una opcion</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button @click="reset()" type="button" class="btn btn-secondary"
                            data-bs-dismiss="modal">Cerrar</button>
                        <!-- <button type="submit" @click="registrar()" class="btn btn-primary">Guardar</button> -->
                        <button v-if="seleccionado && seleccionado.id == null" type="submit" @click="registrar()"
                            class="btn btn-primary">Guardar</button>
                        <button v-else type="button" @click="actualizar()" class="btn btn-primary">Actualizar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

//para el token
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';
const route = useRouter();

const token = localStorage.getItem('token') || '';
const header = {
    headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}
////


const usuarios = ref([]);
let baseURL = 'http://localhost:3000/users';
const nombre = ref('');
const correo = ref('');
const telefono = ref('');
const usuario = ref('');
const password = ref('');
const rol = ref('');

const seleccionado = ref({});
onMounted(() => {
    obtenerDatos();
});

const obtenerDatos = async () => {
    try {
        const { data } = await axios.get(baseURL, header);
        // const response = await axios.get(BaseURL);
        console.log(data);
        usuarios.value = data.data;

    } catch (error) {
        console.log(error);
        if (error.response.status == 403 || error.response.status == 401) {
            expirado();
        }
    }
};
const registrar = async () => {
    if (nombre.value === '' || correo.value === '' || telefono.value === ''|| usuario.value === '' ||password.value === '' || rol.value === '') {
        Swal.fire({
            title: 'Error',
            text: 'Todos los campos son obligatorios',
            icon: 'error'
        })
        return;
    }
};
</script>