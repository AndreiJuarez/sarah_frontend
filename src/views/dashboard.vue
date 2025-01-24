<template>
  <div>
    <!-- Rectángulo punteado -->
    <div class="add-zone-container" @click="showModal">
      <span>Agregar zona</span>
    </div>
  </div>
  <!-- <div class="texto-response">
    <p v-for="item in data">
      Zona:{{ item.zoneName }}
      <br>
      Creación: {{ item.creation_date }}
    </p>
  </div> -->
  <div class="texto-response">
    <p v-for="item in data" :key="item.zoneName" class="button-style" @click="showDetails(item)">
      Zona: {{ item.zoneName }}
      <br />
      Creación: {{ item.creation_date }}
    </p>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from 'axios';

export default {
  name: 'Dashboard',
  data: function () {
    return {
      url: this.BaseURL,
      interval_main: null,
      data: [],
      loading: false,
      extraData: null,
      data_device: {},
      currentZone: null,
      currentNameZone: null
    }
  },
  methods: {

    async showModal() {
      const { isConfirmed, value: zoneName } = await Swal.fire({
        title: "Agregar Nueva Zona",
        html: `
          <input 
            type="text" 
            id="zone-name" 
            class="swal2-input" 
            placeholder="Nombre de la zona"
          />
        `,
        confirmButtonText: '<span style="color: green;">Guardar</span>',
        cancelButtonText: '<span style="color: red;">Cancelar</span>',
        showCancelButton: true,
        focusConfirm: false,
        customClass: {
          confirmButton: "swal-btn-confirm",
          cancelButton: "swal-btn-cancel",
        },
        preConfirm: () => {
          const name = document.getElementById("zone-name").value;
          if (!name) {
            Swal.showValidationMessage("El nombre no puede estar vacío");
          }
          return name;
        },
      });

      if (isConfirmed && zoneName) {
        console.log("Zona guardada:", zoneName);
        // Aquí puedes manejar la lógica para guardar la nueva zona.
        axios
          .post(this.url + "/zone/newZone", { zone: zoneName })
          .then((resp) => {
            console.log(resp);
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    async showDetails(item) {
      this.currentZone = item
      var nameZone = item.zoneName
      this.currentNameZone = nameZone
      this.loading = true; // Marcar que estamos cargando los datos adicionales
      // Generar botones dinámicamente
      try {
        // Realizar la solicitud GET usando axios
        console.log(item.zoneName);
        const zoneDevices = await axios.post(this.url + "/devices/getZDevices", { zone: nameZone });
        const notAssignedDevices = await axios.get(this.url + "/devices/getDevices");
        // const device_data = zoneDevices.data[0];
        const not_Assigned = notAssignedDevices.data;
        // console.log(zoneDevices.data[0]);

        const device_data = zoneDevices.data && zoneDevices.data.length > 0
        ? zoneDevices.data[0] // Si existen datos, usar el primer elemento
        : null; // Si no, asignar null

        const outputButtons = device_data
        ? Object.keys(device_data)
            .filter((key) => key.startsWith("output"))
            .map(
              (key) => `
          <div style="margin-bottom: 10px; padding: 10px; border: 1px solid #ccc; border-radius: 5px;">
            <p><strong>${key}:</strong> Pin ${device_data[key].pin}</p>
            <button 
              style="margin-right: 5px; padding: 5px 10px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;"
              onclick="window.handleOutputAction('${key}', ${device_data[key].pin}, 1)">
              Encender
            </button>
            <button 
              style="padding: 5px 10px; background-color: #f44336; color: white; border: none; border-radius: 5px; cursor: pointer;"
              onclick="window.handleOutputAction('${key}', ${device_data[key].pin}, 0)">
              Apagar
            </button>
          </div>
        `
            )
            .join("")
        : "<p>No hay dispositivos vinculados a esta zona.</p>";
        
        // const outputButtons = Object.keys(device_data)
        //   .filter((key) => key.startsWith("output"))
        //   .map(
        //     (key) => `
        //   <div style="margin-bottom: 10px; padding: 10px; border: 1px solid #ccc; border-radius: 5px;">
        //     <p><strong>${key}:</strong> Pin ${device_data[key].pin}</p>
        //     <button 
        //       style="margin-right: 5px; padding: 5px 10px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;"
        //       onclick="window.handleOutputAction('${key}', ${device_data[key].pin}, 1)">
        //       Encender
        //     </button>
        //     <button 
        //       style="padding: 5px 10px; background-color: #f44336; color: white; border: none; border-radius: 5px; cursor: pointer;"
        //       onclick="window.handleOutputAction('${key}', ${device_data[key].pin}, 0)">
        //       Apagar
        //     </button>
        //   </div>
        // `
        //   )
        //   .join("");



        // Generar divs para dispositivos no asignados
        const availableDivs = not_Assigned
          .map(
            (device) => `
          <div style="margin-bottom: 10px; padding: 10px; border: 1px solid #ccc; border-radius: 5px; display: flex; justify-content: space-between; align-items: center;">
            <p><strong>${device.device}</strong></p>
            <button 
              style="padding: 5px 10px; background-color: #007BFF; color: white; border: none; border-radius: 5px; cursor: pointer;"
              onclick="window.assignDeviceToZone('${device.device}')">
              Asignar a esta zona
            </button>
          </div>
        `
          )
          .join("");

        console.log("DEVICES:", zoneDevices);
        console.log("NOT_ASSIGNED", notAssignedDevices);
        // Guardar los datos adicionales que recibimos
        // this.extraData = response.data;

        Swal.fire({
          title: `Detalles de ${item.zoneName}`,
          html: `
            <p><strong>Zona:</strong> ${item.zoneName}</p>
            <p><strong>Creación:</strong> ${item.creation_date}</p>
            <br>
            <h1>Dispositivos Vinculados</h1>
            <div style="display: flex; flex-wrap: wrap; justify-content: center;">
            ${outputButtons}
            </div>
            <br>
            <h1>Dispositivos Disponibles:</h1>
            <div style="display: flex; flex-direction: column; align-items: center;">
            ${availableDivs}
          </div>
          `,
          // <p><strong>Datos adicionales:</strong> ${this.extraData ? this.extraData.details : "Cargando..."}</p>
          icon: "info",
          confirmButtonText: '<span style="color: red;">Cancelar</span>',
        });
      } catch (error) {
        console.error("Error al obtener los datos adicionales:", error);
      }
    },
  },
  mounted() {
    // Aquí puedes cargar las zonas existentes.
    this.interval_main = setInterval(() => {
      axios.get(this.url + "/zones/getZones")
        .then((res) => {
          // console.log(res);
          this.data = res.data
        })
    }, 1000)


    window.handleOutputAction = (outputKey, pin, action) => {
      // console.log(`Acción ejecutada para: ${outputKey} en el pin ${pin}`);
      // Aquí puedes realizar una acción específica, como enviar un POST al servidor o cambiar el estado
      axios.post(this.url + "/sendInstruction", { pin, state: action });
      // {"pin": 4,"state": 0}
    };

    // Manejo de asignación de dispositivos a la zona
    window.assignDeviceToZone = (deviceName) => {
      console.log(`Asignando ${deviceName} a la zona actual... ${this.currentNameZone}`);
      axios.post(this.url + "/devices/assignDevice", { device: deviceName, zoneName: this.currentNameZone });
      this.showDetails(this.currentZone);
    };
  },
};
</script>

<style scoped>
/* Estilo del rectángulo punteado */
.add-zone-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 100px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  cursor: pointer;
  color: #555;
  background-color: #f9f9f9;
  transition: background-color 0.3s, color 0.3s;
}

.add-zone-container:hover {
  background-color: #e6e6e6;
  color: #333;
}

/* SweetAlert2 estilos personalizados */
.swal-btn-confirm {
  background-color: #4caf50 !important;
  /* Verde */
  color: white !important;
  border: none !important;
  border-radius: 5px !important;
  padding: 10px 20px !important;
  font-size: 14px !important;
}

.swal-btn-confirm:hover {
  background-color: #45a049 !important;
}

.swal-btn-cancel {
  background-color: #f44336 !important;
  /* Rojo */
  color: white !important;
  border: none !important;
  border-radius: 5px !important;
  padding: 10px 20px !important;
  font-size: 14px !important;
}

.swal-btn-cancel:hover {
  background-color: #e53935 !important;
}

.button-style {
  display: inline-block;
  margin: 10px 0;
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button-style:hover {
  background-color: #0056b3;
}
</style>
