function Observer(obj){
    this.data = {}
    this.dfs(obj)
}
let proto = Observer.prototype;
proto.dfs = function(obj){
    for(let key in obj){
        let value = obj[key]
        if(!obj.hasOwnProperty(key)) continue;
        this.createKey(key, value);
    }
}
proto.createKey = function(key, value){
    Object.defineProperty(this.data, key ,{
        configurable: true,
        enumerable: true,
        get:function(){
            console.log(`你访问了${key}`);
            return value;
        },
        set: function(newValue){
            console.log(`你设置了${key},新值为${newValue}`);
            value = newValue;
        }
    })
}
proto.deleteKey = function(key){
    delete this.data[key];
}
let app1 = new Observer({
  name: 'youngwind',
  age: 25
});

let app2 = new Observer({
  university: 'bupt',
  major: 'computer'
});

// 要实现的结果如下：
app1.data.name // 你访问了 name
app1.data.age = 100;  // 你设置了 age，新的值为100
app2.data.university // 你访问了 university
app2.data.major = 'science'  // 你设置了 major，新的值为 science