class Event{
    constructor(){
        this.handlers = {};
    }
    on(key, handler){
        var self = this;
        if(!(key in self.handlers)){
            self.handlers[key] = []
        }
        self.handlers[key].push(handler)
        return this;
    }
    emit(key, ...args){
        let self = this;
        if(!self.handlers[key]) return;
        for(let handler of self.handlers[key]){
            handler.apply(self, args)
        }
    }
}