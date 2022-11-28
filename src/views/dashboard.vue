<template>
  <div class="mt-4 ">
    <h1 class="is-size-5">Buenos dias, Andrei</h1>
  </div>
  <div class="has-text-centered mt-4">
    <div class="columns is-flex">
      <div class="column is-half">
        <button class="button" >
          <font-awesome-icon icon='fa-solid fa-gears'/>
        </button>
      </div>
      <div class="column is-half">
        <button class="button" >
          <font-awesome-icon icon="fa-solid fa-users" />
        </button>
      </div>
    </div>
  </div>

  <div class="has-text-centered mt-4">
    <h1 class="is-size-3">Zonas</h1>
  </div>

  
</template>

<script>
import Boton from '/src/components/Boton.vue'
export default{
  name:'Dashboard',
  components:{
    Boton
  }
}

</script>

<style>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";

button{
  font-size: 2em !important;
  background-color: #00245c !important;
  color: white !important;
}


</style>
