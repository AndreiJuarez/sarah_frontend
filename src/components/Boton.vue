<template>
    <div class="card">
        <div class="card-image">
            <font-awesome-icon icon='fa-solid fa-gears' />
        </div>
        <div class="card-content">
            <h1>{{desc}}</h1>
            <h2>{{BotonIcon}}</h2>
        </div>

    </div>
</template>

<script>
export default {
    name: 'Boton',
    props: {
        desc: String,
        BotonIcon: String
    }
}

</script>

<style>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
</style>