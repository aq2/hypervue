<template lang="pug">
  div
    h1 Choose a dataset
    button(@click='fb=true;csv=false') get dataset from firebase
    span(class='spacer') or
    button(@click='csv=true;fb=false') get data from CSV file
    fbsrc(v-if="fb")
      //- button(@click.prevent='firePost') save to firebase
    csvsrc(v-if='csv')
    br
    br
    //- #yay(v-if='submitted') you submitted post!
    //-   .single-post(v-for='blog in blogs')
    //-     h2 {{blog.title}}
    //-     article {{blog.body}}
</template>


<script>

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

    // get data from dbase
    this.$http.get('https://dvzvue.firebaseio.com/mystuff.json')
      .then(function(data) {
        // console
        return data.json()
      })
      .then(function(data) {
        console.log(data)
        var blogsArray = []
        for (let key in data) {
          console.log(key, data[key])
          data[key].id = key
          blogsArray.push(data[key])
        }
        console.log(blogsArray)
        this.blogs = blogsArray
        
      })
  },
  data() {
    return {
      submitted: false,
      blogs: [],
      datasource: '',
      fb: false,
      csv: false
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
    }
  }

}
</script>


<style lang="stylus" scoped>
.spacer 
  width 50px
  // color red
  display inline-block
  text-align center

</style>
