<template>
    <div class="d-flex justify-content-center align-items-center">
        <div class="card">
            <div class="card-body">
                <h3 class="text-center">Iniciar Sesion</h3>
                <div class="mb-3">
                    <label for="correo" class="form-label">Correo</label>
                    <input v-model="correo" type="email"  id="correo" class="form-control"
                        placeholder="example@example.com" />
                </div>

                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input v-model="password" type="password"  id="password" class="form-control"
                        placeholder="********" />
                </div>

                <div class="mb-3 text-center">
                    <button class="btn btn-primary" @click="ingresar()">Iniciar Sesion</button>
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
            text: 'Estas de regreso '+data.usuario.nombre,
            timer: 1000,
            icon: 'success',
            showConfirmButton: false

        });
        setTimeout(() => {
            route.push({path: '/'})
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

</script>

<style scoped>
.card {
    width: 30rem;
    padding: 2rem;
    margin-top: 10%;
}
</style>