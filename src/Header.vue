<template lang='pug'>
  //- <div>
  //-   <span>HyperViz</span> interactive dataViz for hyper-dimensional data
  //- </div>
  div
    span HyperDViz
    | interactive dataViz for hyper-dimensional data
</template>

<script>
export default {
  computed: {
    foo() {
      return this.$store.state.foo
    }
  }
}
</script>

<style lang='stylus' scoped>
  div
    background #333
    padding .5em
    
  span 
    font-size 2.5em
    margin-right 5em
</style>
