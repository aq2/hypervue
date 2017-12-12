<template lang="pug">

#contents
  h1(id='h') Choose a dataset
  #buttons()
    button(@click="chooseSource('fb')") get dataset from firebase
    span(class='spacer') or
    button(@click="chooseSource('csv')") get data from CSV file
  fbsrc(v-if='fb')
    //- button(@click.prevent='firePost') save to firebase
  transition(name='fade')
    csvsrc(v-if='csv')
  
  

</template>
///
<script>
///

import FirebaseSource from './FirebaseSource.vue'
import CSVSource from './CSVSource.vue'

// page3 functionaility is in sidebar
export default {
  components: {
    'fbsrc': FirebaseSource,
    'csvsrc': CSVSource
  },
  created() {
    // sidebar needs to be wide
    let sid = $('#sidebar')
    sid.style.width = '150px'

    // // get data from dbase
    // this.$http.get('https://dvzvue.firebaseio.com/mystuff.json')
    //   .then(function(data) {
    //     // console
    //     return data.json()
    //   })
    //   .then(function(data) {
    //     console.log(data)
    //     var blogsArray = []
    //     for (let key in data) {
    //       console.log(key, data[key])
    //       data[key].id = key
    //       blogsArray.push(data[key])
    //     }
    //     console.log(blogsArray)
    //     this.blogs = blogsArray
        
    //   })
  },
  data() {
    return {
      submitted: false,
      blogs: [],
      datasource: '',
      fb: false,
      csv: false,
      buttoned: false
    }
  },
  methods: {
    firePost: function() {
      this.$http.post('https://dvzvue.firebaseio.com/mystuff.json', {
        msg: 'success!',
        author: 'mickey'
      }).then(function(data){
        console.log(data)
        this.submitted = true
      })
    },
    chooseSource: function(src) {
      if (src == 'fb') {
        this.fb = true
        this.csv = false
      }
      if (src == 'csv') {
        this.csv = true
        this.fb = false
      }
      this.buttoned = true
      var h = $('#h')
      h.style.paddingRight = '2em'
      h.style.display = 'inline-block'

    }
  }

}
</script>

///
<style lang="stylus" scoped>
.spacer 
  width 50px
  display inline-block
  text-align center

#buttons 
  display inline-block


.fade-enter-active, .fade-leave-active
  transition opacity .5s

.fade-enter, .fade-leave-active
  opacity 0

</style>
