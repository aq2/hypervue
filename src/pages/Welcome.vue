<template lang="pug">

#welcome
  h1 Welcome to HyperDViz
  br
  br
  icon(name='bar-chart' scale=8)
  icon(name='area-chart' scale=8)
  icon(name='line-chart' scale=8)
  icon(name='pie-chart' scale=7)
  br
  br
  #text
    p it doesn't look like much yet, but it will be great!
    p it's better to run this app in full-screen mode, toggled with F11,
    p or with the &nbsp;
      icon(name='window-restore' scale=2)
      | &nbsp; button at top-right
    button let's go fullscreen
    br    
    p press the 'next page' button below to continue
  br
  #link
    button(class='throb' @click='nextPage') next page


</template>


<script>

import {EventBus} from './../main'

export default {

methods: {
  nextPage() {
    EventBus.$emit('changePage', 'dataSrc')
  }
}

}
</script>


<style lang="stylus" scoped>

// #text 
//   background $g6
//   padding 1rem
//   width 600px

</style>
