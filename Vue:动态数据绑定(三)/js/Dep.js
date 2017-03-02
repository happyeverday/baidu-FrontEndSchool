//消息订阅器
class Dep{
    constructor(){
        this.subs = []
    }
    /******************保存依赖于我的，当我发生变动时要通知它们*********************
    *******************sub参数--watcher类**************************************/
    addSub(sub){
        if(this.subs.indexOf(sub) == -1){
            this.subs.push(sub);
        }
    }
    /******************我变了，去通知小兵们Watchers*****************************************/
    notify(){
        for(let sub of this.subs){
            sub.update();
        }
    }
}
Dep.target = null;