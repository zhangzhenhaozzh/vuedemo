/**
 * Created by Administrator on 2016/12/29.
 */
/*1.神奇的map与filter
* */
function myMap(fn) {
  var newArray = []
  for (var i = 0; i < this.length; i++) {
    newArray.push(fn(this[i], i))
  }
  return newArray
}

function myFilter(fn) {
  var newArray = []
  for (var i = 0; i < this.length; i++) {
    if (fn(this[i], i)){
      newArray.push(this[i])
    }
  }
  return newArray
}
/*
 将这个函数放到Array的prototype里就是map了
 * */
/*2.粗解双向数据绑定与数据劫持defineProperties
* */
var newObj = {}
Object.defineProperties(newObj,{
  test:{
    get:function () {
      console.log(this === newObj)
      return 1
    },
    set:function (newvalue) {
      console.log(newvalue)
    }
  }
})
console.log(newObj.test) //true 1
newObj.test = 2 //newvalue = 2
console.log(newObj.test)  //值还是1
/*
所有的取值操作都被get拦截，将get返回值作为取得的值
所有的赋值操作会被set拦截，并将新值作为参数输入进set，并且赋值都不会生效。
* */
/*既然改变会被劫持那么我们怎么绑定数据呢？
* */

/*html代码：<input type-"text" id="user">
* */
var dep = {}
Object.defineProperties(dep, {
  user:{
    get:function () {
      return document.getElementById('user').value
    },
    set:function (newvalue) {
      document.getElementById('user').value = newvalue
    }
  }
})
/*这样就实现了简单的绑定，那么vue的数据绑定的具体流程是什么样的呢？*/
/*vue代码：
html代码
 <div id="box">
 <input type="text" v-model="mes" @keydown.enter="add">
 <p>{{mes}}</p>
 </div>
js代码
 new Vue({
 el:'#box',
 data:{
 mes:'',
 todos:['chifan']
 },
 methods:{
 add:function(){
 this.todos.unshift(this.mes)
 this.mes = ''
 }
 }
 })
* */