class Observer{
    constructor(obj){
        this.data = obj
        this.make()
    }
    make(){
        for(let key in this.data){
            let value = this.data[key]
            if(!this.data.hasOwnProperty(key)) continue;
            if(typeof value == 'object'){
                new Observer(value);
            }
            this.createKey(key, value);
        }
    }
    createKey(key, value){
        let self = this, dep = new Dep();;
        Object.defineProperty(this.data, key ,{
            configurable: true,
            enumerable: true,
            get:function(){
                //收集依赖
                if(Dep.target){
                    dep.addSub(Dep.target)
                }
                return value;
            },
            set: function(newValue){
                if(newValue === value) return;
                if(typeof newValue == 'object'){
                    new Observer(newValue);
                }
                value = newValue;
                //通知变化
                dep.notify();
            }
        })
    }
    $watch(key, callback){
        new Watcher({
            observer: this,
            key: key,
            callback: callback
        });
    }
}

