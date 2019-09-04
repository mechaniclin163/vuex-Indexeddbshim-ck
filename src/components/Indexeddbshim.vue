<template>
  <div class="hello">
    <h1>Indexeddbshim</h1>
    <input type="button" value="addPublication" class="input-btn" @click="addPublication()">
    <input type="button" value="readAll" class="input-btn" @click="readAll()">
    <input type="button" value="read" class="input-btn" @click="read()">
    <input type="button" value="update" class="input-btn" @click="update()">
    <input type="button" value="remove" class="input-btn" @click="remove()">
    <input type="button" value="indexRead" class="input-btn" @click="indexRead()">
  </div>
</template>

<script>
export default {
  name: '',
  computed: {
  },
  data () {
    return {
      request: '',
      db:''
    }
  },
  created(){
    console.log('---------------shimIndexedDB---------------')
    console.log(shimIndexedDB)
    // this.openDatabase()
    var indexedDB = shimIndexedDB;
    let _this = this
    const dbName = "test_duxinli_DB";
    var request = indexedDB.open(dbName, 2);

    request.onupgradeneeded = function(event) {
      // 这时通过事件对象的target.result属性，拿到数据库实例。
      _this.db = event.target.result;

      // 新建数据库
      // 数据库新建成功以后，新增一张叫做customers的表格，主键是id。
      // autoIncrement: true 指定主键为一个递增的整数
      var objectStore = _this.db.createObjectStore("customers", { keyPath: 'id', autoIncrement: true });

      // 新建索引
      // IDBObject.createIndex()的三个参数分别为索引名称、索引所在的属性、配置对象（说明该属性是否包含重复的值）。
      objectStore.createIndex('name', 'name', { unique: false });
      objectStore.createIndex('age', 'age', { unique: false });
    };
    request.onsuccess = function(e) {
        console.log("Success!");
        _this.db = e.target.result;
    }
     
    request.onerror = function(e) {
        console.log("Error");
        console.dir(e);
    }
  },
  methods: {
    addPublication() {
        console.log('add Data')
        var i = Date.parse(new Date()).toString().substr(0,10);


        var tx = this.db.transaction(['customers'], 'readwrite');
        var store = tx.objectStore('customers');
        var req = store.add({ name: "xiaoyan"+i, age: 223, email: "xiaoyan@xiaoyan.org" });
        // 上面代码中，写入数据需要新建一个事务。新建时必须指定表格名称和操作模式（"只读"或"读写"）。新建事务以后，通过IDBTransaction.objectStore(name)方法，拿到 IDBObjectStore 对象，再通过表格对象的add()方法，向表格写入一条记录。

        req.onsuccess = function (evt) {
          console.log('-----add Data----onsuccess----------')
          console.log(evt)
          // displayPubList();
        };
        req.onerror = function(error) {
          console.error("add error", error);
        };
    },
    // 读取数据
    read() {
      var tx = this.db.transaction(['customers'], 'readonly');
      var store = tx.objectStore('customers');
      var request = store.get(2);
      // 上面代码中，objectStore.get()方法用于读取数据，参数是主键的值。

      request.onerror = function(event) {
        console.log('事务失败');
      };

      request.onsuccess = function( event) {
          if (request.result) {
            console.log('Name: ' + request.result.name);
            console.log('Age: ' + request.result.age);
            console.log('Email: ' + request.result.email);
          } else {
            console.log('未获得数据记录');
          }
      };
    },
    readAll() {
      var tx = this.db.transaction(['customers'], 'readonly');
      var store = tx.objectStore('customers');
      // 新建指针对象的openCursor()方法是一个异步操作，所以要监听success事件。
      store.openCursor().onsuccess = function (event) {
        var cursor = event.target.result;

        if (cursor) {
          console.log('Id: ' + cursor.key);
          console.log('Name: ' + cursor.value.name);
          console.log('Age: ' + cursor.value.age);
          console.log('Email: ' + cursor.value.email);
          cursor.continue();
        } else {
          console.log('没有更多数据了！');
        }
      };
    },
    indexRead(){
      var tx = this.db.transaction(['customers'], 'readonly');
      var store = tx.objectStore('customers');
      var index = store.index('name');
      var request = index.get('test1567576330');

      request.onsuccess = function (e) {
        var cursor = e.target.result;
        if (cursor) {
          // ...
          console.log('--------------')
          console.log(cursor)
          console.log('Id: ' + cursor.id);
          console.log('Name: ' + cursor.name);
          console.log('Age: ' + cursor.age);
          console.log('Email: ' + cursor.email);
          // cursor.continue();
        } else {
          // ...
          console.log('没有更多数据了！')
        }
      }
    },
    // 更新数据
    update() {
      var request = this.db.transaction(['customers'], 'readwrite')
        .objectStore('customers')
        .put({ id: 2, name: '李四', age: 35, email: 'lisi@example.com' });
      // put()方法自动更新了主键为1的记录。
      request.onsuccess = function (event) {
        console.log('数据更新成功');
      };

      request.onerror = function (event) {
        console.log('数据更新失败');
      }
    },
    remove() {
      var request = this.db.transaction(['customers'], 'readwrite')
        .objectStore('customers')
        .delete(4);

      request.onsuccess = function (event) {
        console.log('数据删除成功');
        console.log(event)
      };
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
