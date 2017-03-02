class Vue{
    constructor(options){
        this.$data = options.data;
        this.$el = document.querySelector(options.el);
        this.m = new Map();
        this.render()
    }
    render(){
        let html = this.$el.innerHTML,
            reg = /.*({{(.*)?}})/g,
            result = null,
            originHtml = html;
            while(result = reg.exec(originHtml)){
                let originString = result[1], key = result[2].trim(), value = '';
                if(!this.m.has(key)){
                    this.m.set(key, this.getValue(this.$data, key));
                    value = this.m.get(key);
                }
                else{
                    value = this.m.get(key);
                }
                html = html.replace(originString, value);
            }
            this.$el.innerHTML = html;
    }
    getValue(obj, key){
        let keys = key.split('.');
        for(let curKey of keys){
            if(obj == undefined){
                return undefined;
            }
            obj = obj[curKey];
        }
        return obj;
    }
}