//消息订阅器
function Dep(){
  this.subs = [];
}

Dep.target = null;

/******************保存依赖于我的，当我发生变动时要通知它们*********************
*******************sub参数--watcher类**************************************/
Dep.prototype.addSub = function(sub){
    if(this.subs.indexOf(sub) == -1){
        this.subs.push(sub);
    }
}
/******************我变了，去通知小兵们Watchers*****************************************/
Dep.prototype.notify = function(){
    for(let sub of this.subs){
        sub.update();
    }
}