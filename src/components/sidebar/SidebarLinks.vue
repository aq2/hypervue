<template lang='pug'>

  #sidebarLinks 
    //- icon(name='window-restore')
    //- button(@click='goFullScreen()') full screen
    ul
      li
        router-link(to='/' exact) home
      li 
        router-link(to='/data') get data


</template>


<script>
export default {
  methods: {
    goFullScreen() {
      var el = document.documentElement,
        rfs = el.requestFullScreen
          || el.webkitRequestFullScreen
          || el.mozRequestFullScreen
          || el.msRequestFullscreen

      rfs.call(el)
    }
  }
}
</script>



<style lang="stylus" scoped>

#sidebarLinks 
  padding-right 0.2rem

ul
  padding 0 
  // background $g2
  max-width 120px
  margin 0 auto
  list-style-type none

li
  background $blue
  padding .5rem
  margin 1rem 0
  border-radius 5px
  font-size 1.05rem
  transition 0.5s all ease
  text-align center

.router-link-active 
  // background brown
  border-radius 5px
  color $gb
  cursor default

// .router-link-active::after
//   content: ' ✴️'
//   font-size 0.7rem


</style>
