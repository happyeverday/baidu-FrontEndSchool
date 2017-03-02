function Watcher(options) {
    this.callback = options.callback
    this.observer = options.observer
    this.key = options.key
    this.get()
}

Watcher.prototype.dfs = function(obj) {
    for(let attr in obj){
        if(obj.hasOwnProperty(attr) && typeof obj[attr] == 'object'){
            this.dfs(obj[attr])
        }
    }
}
// 更新操作
Watcher.prototype.update = function() {
    this.callback.call(this.observer, this.get());
}

//触发get添加依赖
Watcher.prototype.get = function() {
    Dep.target = this
    //访问key，利用get添加依赖
    let value = this.observer.data[this.key]
    //对于value的属性也要添加依赖
    if(typeof value == 'object'){
        this.dfs(value)
    }
    Dep.target = null
    return value
}