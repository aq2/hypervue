<template lang='pug'>

  #header
    span HyperDViz
    | interactive dataViz for hyper-dimensional data

</template>

<script>

export default {
  computed: {
    counter() {
      return this.$store.getters.getCnter
    }
  }
}
</script>

<style lang='stylus' scoped>
  #header
    background #456
    padding .51em
    
  span 
    font-size 2.51em
    margin-right 2em
</style>
