<template>
    <div>

        <div class="d-flex justify-content-center align-items-center">
            <div class="card">
                <div class="card-body">
                    <h3 class="text-center">Iniciar Sesion</h3>
                    <div class="mb-3">
                        <label for="correo" class="form-label">Correo</label>
                        <input v-model="correo" type="email" id="correo" class="form-control"
                            placeholder="example@example.com" />
                    </div>

                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input v-model="password" type="password" id="password" class="form-control"
                            placeholder="********" />
                    </div>

                    <div class="mb-3 text-center d-flex justify-content-around">
                        <button class="btn btn-primary" @click="ingresar()">Iniciar Sesion</button>
                        <button class="btn btn-secondary" data-bs-toggle="modal"
                            data-bs-target="#modalUsuario">Registrar Usuario</button>

                    </div>
                </div>
            </div>

        </div>
        <!-- Modal -->
        <div class="modal fade text-black" id="modalUsuario" data-bs-backdrop="static" data-bs-keyboard="false"
            tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">
                            Datos del Usuario
                        </h1>
                        <button type="button" @click="reset()" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <form action="#" class="needs-validation" novalidate>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label for="nombre" class="form-label">Nombre</label>
                                <input type="text" v-model="nombre" id="nombre" class="form-control" required />
                            </div>
                            <div class="mb-3">
                                <label for="correo" class="form-label">Correo</label>
                                <input type="text" v-model="correo" id="correo" class="form-control" required />
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
                                        <input type="usuario" v-model="usuario" id="usuario" class="form-control"
                                            required />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">Rol</label>
                                        <select v-model="rol" class="form-select">
                                            <option value="cliente" selected>Cliente</option>

                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="password" class="form-label">Contraseña</label>
                                        <input type="password" v-model="password" id="password"
                                            class="form-control" required />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" @click="reset()" class="btn btn-danger" data-bs-dismiss="modal">
                                Cerrar
                            </button>
                            <button type="button" @click="registrarUsuario()"
                                class="btn btn-success">Guardar</button>
                            
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>



</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';
const route = useRouter();

const correo = ref('');
const password = ref('');

const nombre = ref('');
const telefono = ref('');
const usuario = ref('');
const rol = ref('');

const estado = ref('');


let baseURL = 'http://localhost:3000/auth';

onMounted(() => {
    limpiar();
});

const ingresar = async () => {
    if (correo.value === '' || password.value === '') {
        Swal.fire({
            title: 'Error',
            text: 'Ingrese sus credenciales',
            icon: 'error'
        })
        return;
    }

    var datos = {
        correo: correo.value,
        password: password.value

    }
    try {
        const { data } = await axios.post(baseURL + '/login', datos)
        console.log(data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('usuario', JSON.stringify(data.usuario));

        Swal.fire({
            title: 'Bienvenido',
            text: 'Estas de regreso ' + data.usuario.nombre,
            timer: 1000,
            icon: 'success',
            showConfirmButton: false

        });
        setTimeout(() => {
            route.push({ path: '/' })
        }, 1000);

    } catch (error) {
        console.log(error);
        console.log(error.response.data);
        Swal.fire({
            title: 'Error',
            text: error.response.data,
            icon: 'error'
        })
    }
};

const limpiar = () => {
    localStorage.clear();
};
const registrarUsuario = async () => {
    if (nombre.value == '' || correo.value == '' || telefono.value == '' || usuario.value == '' || rol.value == '' || password.value == '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Todos los campos son obligatorios'
        })
        return;
    }
    const datos = {
        nombre: nombre.value,
        correo: correo.value,
        telefono: telefono.value,
        usuario: usuario.value,
        password: password.value,
        rol: rol.value
    };
    try {
        const { data } = await axios.post(baseURL + '/store', datos);

        Swal.fire({
            icon: 'success',
            title: 'Usuario Registrado',
            text: 'Usuario registrado con exito! Ahora inicia sesion',
            timer: 2000,
        })
        

        console.log(data);
        
        reset();

        var myModalEl = document.getElementById('modalUsuario');
        var modal = bootstrap.Modal.getInstance(myModalEl);
        modal.hide();

    } catch (error) {
        console.log(error);
    }
}
const reset = () => {
    nombre.value = '';
    telefono.value = '';
    usuario.value = '';
    rol.value = '';
    correo.value = '';
    password.value = '';
};
</script>

<style scoped>
.card {
    width: 30rem;
    padding: 2rem;
    margin-top: 10%;
}
</style>