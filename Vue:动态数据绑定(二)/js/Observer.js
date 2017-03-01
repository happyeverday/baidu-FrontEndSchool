function Observer(obj){
    this.data = obj
    this._eventBus = new Event()
    this.dfs()
}
let proto = Observer.prototype;
proto.dfs = function(){
    for(let key in this.data){
        let value = this.data[key]
        if(!this.data.hasOwnProperty(key)) continue;
        if(typeof value == 'object'){
            new Observer(value);
        }
        this.createKey(key, value);
    }
}
proto.createKey = function(key, value){
    let self = this;
    Object.defineProperty(this.data, key ,{
        configurable: true,
        enumerable: true,
        get:function(){
            console.log(`你访问了${key}`);
            return value;
        },
        set: function(newValue){
            if(typeof newValue == 'object'){
                new Observer(newValue)
            }
            self._eventBus.emit(key, value, newValue)
            console.log(`你设置了${key},新值为${newValue}`);
            value = newValue;
        }
    })
}
proto.$watch = function(type, callback){
    this._eventBus.on(type, callback)
}