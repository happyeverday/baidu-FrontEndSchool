define(function(){
    function Observer(obj){
        this._origin = obj
        this.data = {}
        if(Array.isArray(obj)) this.data.length = obj.length;
        this.dfs()
    }
    let proto = Observer.prototype;
    proto.dfs = function(){
        for(let key in this._origin){
            let value = this._origin[key]
            if(!this._origin.hasOwnProperty(key)) continue;
            if(typeof value == 'object'){
                this.data[key] = (new Observer(value));
            }
            else{
                this.createKey(key, value);
            }
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
    proto.push = function(value){
        console.log(`你在执行数组push 值为${value}`);
        this.createKey(this.data.length++, value);
    }
    proto.pop = function(){
        console.log(`您在执行数组pop`);
        this.deleteKey(--this.data.length);
    }
    return Observer
})