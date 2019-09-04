<template>
  <div class="hello">
    <div class="click" @click="vuexGetter()">vuexGetter</div>
    <div class="click" @click="vuexMutations()">vuexMutations</div>
    <div class="click" @click="vuexActions()">vuexActions</div>
    {{this.$store.state.count}}
    <div class="click" @click="vuexModuleGetter()">vuexModuleGetter</div>
    <div class="click" @click="vuexModuleMutations()">vuexMutations</div>
    <div class="click" @click="vuexModuleActions()">vuexActions</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import { mapState } from 'vuex'
export default {
  name: '',
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters({
      todoCount: 'todoCount',
    }),
    ...mapState({
      countModuleA: state => state.moduleA.countModuleA
    })
    
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created(){
  },
  methods: {
    ...mapActions({
      countAddActions: 'countAddActions', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
      moduleAcountAddActions: 'moduleA/countAddActions'
    }),
    vuexGetter(){
      console.log('this.todoCount')
      console.log(this.todoCount)
    },
    vuexMutations(){
      this.$store.commit('countAdd', 789)
    },
    vuexActions(){
      this.countAddActions(111)
    },


    vuexModuleGetter(){
      console.log('moduleA/countModuleA')
      console.log(this.countModuleA)
    },
    vuexModuleMutations(){
      this.$store.commit('moduleA/countModuleAdd', 111)
    },
    vuexModuleActions(){
      this.moduleAcountAddActions(11)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.click{
  cursor: pointer;
}
</style>
