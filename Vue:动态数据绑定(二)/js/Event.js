function Event(){
    this.handlers = {}
}
Event.prototype = {
    constructor: Event,
    on: function(eventType, handler){
        var self = this;
        if(!(eventType in self.handlers)){
            self.handlers[eventType] = []
        }
        self.handlers[eventType].push(handler)
        return this;
    },
    emit: function(eventType, ...args){
        let self = this;
        for(let i = 0;i < self.handlers[eventType].length;i++){
            self.handlers[eventType][i].apply(self, args);
        }
    }
}