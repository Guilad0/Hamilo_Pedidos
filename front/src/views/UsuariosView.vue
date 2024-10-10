<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <h5 class="card-title">Usuarios</h5>
          </div>
          <div class="col-md-6 text-end">
            <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalUsuario">
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
                <th>Nombre</th>                
                <th>Correo</th>                
                <th>Telefono</th>
                <th>Usuario</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Editar</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="usuario in usuarios" :key="usuario">
                <td>{{ usuario.id }}</td>
                <td>{{ usuario.nombre }}</td>
                <td>{{ usuario.correo }}</td>
                <td>{{ usuario.telefono }}</td>
                <td>{{ usuario.usuario }}</td>
                <td>{{ usuario.rol }}</td>
                <td>{{ usuario.estado }}</td>
                <td>
                  <button @click="seleccionar(item)" class="btn btn-warning btn-sm">
                    <i class="fa fa-edit"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade text-black" id="modalUsuario" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">
              Datos del Usuario
            </h1>
            <button type="button" @click="reset()" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form action="#" class="needs-validation" novalidate>
            <div class="modal-body">
              <div class="mb-3">
                <label for="nombre" class="form-label">Nombre</label>
                <input type="text" v-model="nombre" id="nombre" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="correo" class="form-label">Correo</label>
                <input type="email" v-model="correo" id="correo" class="form-control" required />
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="telefono" class="form-label">Telefono</label>
                    <input type="number" v-model="telefono" id="telefono" class="form-control" required/>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="usuario" class="form-label">Usuario</label>
                    <input type="usuario" v-model="usuario" id="usuario" class="form-control" required />
                  </div>  
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label>Rol</label>
                    <br>
                    <br>
                    <select v-model="rol">
                      <option disabled value=""> Elija un rol</option>
                      <option value="admin">Administrador</option>
                      <option value="cliente">Cliente</option>
                      <option value="vendedor">Vendedor</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="contraseña" class="form-label">Contraseña</label>
                    <input type="contraseña" v-model="contraseña" id="contraseña" class="form-control" required />
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" @click="reset()" class="btn btn-danger" data-bs-dismiss="modal">
                Cerrar
              </button>
              <button v-if="seleccionado && seleccionado.id == null" type="button" @click="registrar()" class="btn btn-success">Guardar</button>
              <button v-else type="button" @click="actualizar()" class="btn btn-success">Actualizar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Swal from "sweetalert2";

const usuarios = ref([]);
let baseURL = 'http://localhost:3000/usuarios';

const nombre = ref('');
const correo = ref('');
const telefono = ref('');
const usuario = ref('');
const rol = ref('');
const contraseña = ref('');
const estado = ref('');
const seleccionado = ref({});

const myModalEl = document.getElementById('modalUsuario');
const modal = bootstrap.Modal.getInstance(myModalEl)

onMounted(() => {
  obtenerDatos();
});

const obtenerDatos = async () => {
  try {
    const { data } = await axios.get(baseURL);
    console.log(data);

    usuarios.value = data.data;
  } catch (error) {
    console.log(error);
  }
};

const registrar = async () => {
  if(nombre.value == '' || correo.value == '' || telefono.value == '' || usuario.value == '' || rol.value == '' || contraseña.value == ''){
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
    rol: rol.value,
    contraseña: contraseña.value
  };
  try {
    const { data } = await axios.post(baseURL + '/store', datos);
    console.log(data);
    obtenerDatos();
    reset();

    modal.hide();

  } catch (error) {
    console.log(error);
  }
};

//seleccionar
const seleccionar = (item) => {
  seleccionado.value = item;
  nombre.value = item.nombre;  
  correo.value = item.correo;
  telefono.value = item.telefono;
  usuario.value = item.usuario;
  rol.value = item.rol;
  contraseña.value = item.contraseña;
  estado.value = item.estado;

  modal.show();
}

const actualizar = async () => {

  if(nombre.value == '' || correo.value == '' || telefono.value == '' || usuario.value == '' || rol.value == '' || contraseña.value == ''){
    alert('Todos los campos son obligatorios');
    return;
  }

  const datos = {
    nombre: nombre.value,    
    correo: correo.value,
    telefono: telefono.value,
    usuario: usuario.value,
    rol: rol.value,
    contraseña: contraseña.value
  };
  try {
    const { data } = await axios.put(baseURL + '/update' + '/' + seleccionado.value.id, datos);
    console.log(data);
    obtenerDatos();
    reset();

    modal.hide();

  } catch (error) {
    console.log(error);

  }
};

const reset = () => {
  nombre.value = '';
  correo.value = '';
  telefono.value = '';
  usuario.value = '';
  contraseña.value = '';
  rol.value = '';

  seleccionado.value = {};
};

</script>

<style scoped></style>