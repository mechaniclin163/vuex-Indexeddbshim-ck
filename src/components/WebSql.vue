<template>
  <div class="hello">
    <input type="button" value="insertData" class="input-btn" @click="insertData()">
    <input type="button" value="selectData" class="input-btn" @click="selectData()">
    <input type="button" value="updateData" class="input-btn" @click="updateData()">
  </div>
</template>

<script>
export default {
  name: '',
  computed: {
  },
  data () {
    return {
      vardataBase: ''
    }
  },
  created(){
    this.openDatabase()
  },
  methods: {
    openDatabase(){
      // openDatabasek中五个参数分别为：数据库名、版本号、描述、数据库大小、创建回调
      let dbname = 'mydb'
      let version = '1.1'
      let dbdesc = 'test db'
      let dbsize = 2 * 1024 * 1024
      this.vardataBase = window.openDatabase(dbname, version, dbdesc, dbsize);
      this.vardataBase.transaction(function (tx) {  
        tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id unique, log)');
      });
    },
    // 插入数据
    insertData(){
      let e_id = 4
      let e_log = 'test'
      this.vardataBase.transaction(function (tx) {
        console.log('insert...')
        // tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id unique, log)');
        tx.executeSql('INSERT INTO LOGS (id, log) VALUES (3, "菜鸟教程")');
        console.log(e_id, e_log)
        tx.executeSql('INSERT INTO LOGS (id, log) VALUES  (?, ?)', [e_id, e_log]);
      });
    },
    // 查询数据
    selectData(){
      this.vardataBase.transaction(function (tx) {
        console.log('select...')
        tx.executeSql('SELECT * FROM LOGS', [], function (tx, results) {
          console.log('-----------results--------------')
          console.log(results)
        });
      });
    },
    updateData(){
      this.vardataBase.transaction(function (tx) {
        console.log('select...')
        tx.executeSql('UPDATE LOGS SET log=\'www.w3cschool.cc\' WHERE id=2');
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.input-btn{
  width: 150px;
  height: 30px;
}
</style>
