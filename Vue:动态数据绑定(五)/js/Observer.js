function Observer(obj){
    this.data = obj
    this.dep = new Dep();
    this.make()
}
Observer.prototype = {
    constructor: Observer,
    make: function(){
        for(let key in this.data){
            let value = this.data[key]
            if(!this.data.hasOwnProperty(key)) continue;
            this.createKey(key);
        }
    },
    createKey: function(key){
        let self = this;
        let childObserver = null;
        let value = this.data[key];
        if(typeof this.data[key] == 'object'){
            childObserver = new Observer(value);
        }
        Object.defineProperty(this.data, key ,{
            configurable: true,
            enumerable: true,
            get:function(){
                //收集依赖
                console.log(`get ${key}`)
                if(Dep.target){
                    self.dep.addSub(Dep.target)
                }
                return value;
            },
            set: function(newValue){
                console.log(`set ${key}`)
                if(newValue === value) return;
                if(typeof newValue == 'object') childObserver = new Observer(newValue);
                value = newValue;
                //通知变化
                self.dep.notify();
            }
        })
    },
    $watch: function(key, callback){
        new Watcher({
            observer: this,
            key: key,
            callback: callback
        })
    }
}

