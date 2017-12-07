<template lang="pug">
  div
    h1 Choose a data-file from your computer
    p press the button i the sidebar to seelct a data file
    p it must be in CSV format
    p with criteria headers as first row, eg:
    <pre> city,state,population,land area<br>
    |  seattle,WA,652405,83.9
    |  new york,NY,8405837,302.6
    |  boston,MA,645966,48.3
    |  kansas city,MO,467007,315.0
    </pre>
    br
    button(@click.prevent='firePost') save to firebase
    br
    #yay(v-if='submitted') you submitted post!
      .single-post(v-for='blog in blogs')
        h2 {{blog.title}}
        article {{blog.body}}

</template>


<script>
// page3 functionaility is in sidebar
export default {
  created() {
    // sidebar needs to be wide
    let sid = $('#sidebar')
    sid.style.width = '150px'

    // get data from dbase
    this.$http.get('https://dvzvue.firebaseio.com/mystuff.json')
      .then(function(data) {
        // this.blogs = data.body.slice(0, 10)
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
        
      })
  },
  data() {
    return {
      submitted: false,
      blogs: []
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


<style lang="stylus">
#yay 
  max-width 400px
  margin 0 auto
.single-post 
  padding 10px
  margin 20px 0
  box-sizing border-box
  background #eee 

</style>
