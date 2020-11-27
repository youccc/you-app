<template>
  <div class="home">
    123213
  </div>
</template>

<script>
import Mock from 'mockjs'
export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      
    }
  },
  mounted(){
    this.init();
  },
  methods:{
    init(){
      let you = Mock.mock({
          "string|1-10": "★"
      })
      console.log(you)
    }
  }
}
</script>
