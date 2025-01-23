<template>
  <div>
    <!-- Rectángulo punteado -->
    <div class="add-zone-container" @click="showModal">
      <span>Agregar zona</span>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
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
      }
    },
  },
  mounted() {
    // Aquí puedes cargar las zonas existentes.
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
  background-color: #4caf50 !important; /* Verde */
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
  background-color: #f44336 !important; /* Rojo */
  color: white !important;
  border: none !important;
  border-radius: 5px !important;
  padding: 10px 20px !important;
  font-size: 14px !important;
}

.swal-btn-cancel:hover {
  background-color: #e53935 !important;
}
</style>

