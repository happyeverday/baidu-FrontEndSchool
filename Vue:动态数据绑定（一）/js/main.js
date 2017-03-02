class Observer{
    constructor(obj){
        this.data = obj
        this.make(obj)
    }
    make(obj){
        for(let key in obj){
            let value = obj[key]
            if(!obj.hasOwnProperty(key)) continue;
            this.createKey(key, value);
            if(typeof value == 'object'){
                new Observer(value)
            }
        }
    }
    createKey(key, value){
        Object.defineProperty(this.data, key ,{
            configurable: true,
            enumerable: true,
            get:function(){
                console.log(`你访问了${key}`);
                return value;
            },
            set: function(newValue){
                console.log(`你设置了${key},新值为${newValue}`);
                if(typeof newValue == 'object'){
                    new Observer(newValue);
                }
                value = newValue;
            }
        })
    }
}
let app1 = new Observer({
  name: '知浅',
  age: 23,
  school: {
      university: 'bupt',
      major: 'computer'
  }
});

// 要实现的结果如下：
app1.data.name // 你访问了 name
app1.data.age = 100;  // 你设置了 age，新的值为100
app1.data.school.university = 1;
// [Log] 你访问了school (main.js, line 21)
// [Log] 你设置了university,新值为1 (main.js, line 25)