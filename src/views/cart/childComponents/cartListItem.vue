<template>
    <div>
      <h2>{{product}}</h2>
    </div>
</template>

<script>
export default {
  name: "cartListItem",
  props:{
    product:{
      type:Object,
      default(){
        return {}
      }
    }
  }
}
</script>

<style scoped>

</style>
