// 应用场景：全局状态管理器、全局配置对象等
// 闭包实现
const single = (function() {
  let instance = null;
  
  function createInstance() {
    // 创建单例对象
    return {
      // 单例对象的方法和属性；
    }
  }
  return {
    getInstance: function() {
      // 如果单例对象不存在，则创建一个单例对象
      if(!instance){
        instance = createInstance();
      }
      return instance;
    }
  }
})();

const singleInstance1 = single.getInstance();
const singleInstance2 = single.getInstance();
console.log(singleInstance1 === singleInstance2);


// class函数实现
class Single {
  constructor() {
    if(!Single.instance) {
      return Single.instance;
    }
    this.config = {};
    Single.instance = this;
  }
  setConfig(key,value){
    this.config[key] = value;
  }
  getConfig(key){
    return this.config[key];
  }
}

