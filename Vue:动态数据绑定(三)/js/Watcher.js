class Watcher{
    constructor(options){
        this.callback = options.callback
        this.observer = options.observer
        this.key = options.key
        this.get()
    }
    //触发get添加依赖
    get(){
        //当前依赖设置成我
        Dep.target = this
        //访问key，利用get添加依赖
        let value = this.observer.data[this.key]
        if(typeof value == 'object'){
            this.dfs(value)
        }
        Dep.target = null
        return value
    }
    dfs(obj) {
        for(let attr in obj){
            if(obj.hasOwnProperty(attr) && typeof obj[attr] == 'object'){
                this.dfs(obj[attr])
            }
        }
    }
    // 触发回调
    update(){
        this.callback.call(this.observer, this.get());
    }
}