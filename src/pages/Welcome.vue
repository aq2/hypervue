<template lang="pug">

#page
  h1 Welcome to HyperDViz
  .v
  icon(name='bar-chart' scale=8)
  icon(name='area-chart' scale=8)
  icon(name='line-chart' scale=8)
  icon(name='pie-chart' scale=7)
  .v

  #text
    p It doesn't look like much yet, but it will be great!
    p It's better to run this app in full-screen mode,
    p toggled with F11, or with the &nbsp;
      icon(name='window-restore' scale=2)
      | &nbsp; button at top-right
    button(@click='fullScreen') let's go fullscreen
    p press the 'next page' button below to continue
  .v

  button(class='throb' @click='nextPage') next page


</template>


<script>

import {EventBus} from './../main'

export default {

methods: {
  nextPage() {
    EventBus.$emit('changePage', 1)
    EventBus.$emit('changePageType', 'data')
  },
  fullScreen() {
    EventBus.$emit('fullScreen')
  }
}

}

</script>
