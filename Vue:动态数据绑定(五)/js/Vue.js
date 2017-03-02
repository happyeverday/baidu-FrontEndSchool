function Vue(options){
    this.$data = options.data;
    this.$el = document.querySelector(options.el);
    this._observer = new Observer(this);
    this._observer.$watch('$data', this.render.bind(this));
    this._originHtml = this.$el.innerHTML;
    this.render()
}

Vue.prototype.render = function(){
    let html = this._originHtml,
        reg = /.*({{(.*)?}})/g,
        result = null,
        originHtml = this._originHtml;
        let m = new Map;
        while(result = reg.exec(originHtml)){
            let originString = result[1], key = result[2], value = '';
            if(!m.has(key)){
                m.set(key, this.getValue(this.$data, key));
                value = m.get(key);
            }
            else{
                value = m.get(key);
            }
            html = html.replace(originString, value);
        }
        this.$el.innerHTML = html;
}

Vue.prototype.getValue = function(obj, key){
    let keys = key.split('.');
    for(let curKey of keys){
        if(obj == undefined){
            return undefined;
        }
        obj = obj[curKey];
    }
    return obj;
}