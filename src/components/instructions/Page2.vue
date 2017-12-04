<template lang="pug">
  div
    h1 meet your sideKick
    p here's your sidebar
    p you can open and close it by clicking on the > icon
    p try it a few times
</template>


<script>


export default {
  created() {
  //  console.log($('#sidebar').classList)
  //  $('#sidebar').classList.add('whiteBorder')
  $('#sidebar').style.border = '1px solid yellow'
   
  },
  destroyed() {
  $('#sidebar').style.border = ''
    // $('#sidebar').style.background = 'steelblue'
  }
   
}
</script>


<style lang="stylus" scoped>

// .greenBorder
//   border 1px solid green

// .whiteBorder
//   border 5px solid white


</style>

