// 一、单例模式
// 应用场景：全局状态管理器、全局配置对象等
class ConfigManager {
  constructor() {
      // 判断是否已经存在实例，如果存在则返回现有实例，避免重复创建
      if (ConfigManager.instance) {
          return ConfigManager.instance;
      }
      this.config = {};
      ConfigManager.instance = this;
  }
  setConfig(key, value) {
      this.config[key] = value;
  }
  getConfig(key) {
      return this.config[key];
  }
}
var config1 = new ConfigManager();
var config2 = new ConfigManager();
console.log(config1 === config2); // 输出: true

// 二、工厂模式
// 应用场景：用于创建不同类型的对象，例如创建不同类型的组件、创建不同类型的数据请求等。
// 示例1写法：
// 日志对象构造函数
function Log(message, level) {
  this.message = message;
  this.level = level;
}

// 日志对象的方法
Log.prototype.display = function() {
  console.log(`[${this.level}] ${this.message}`);
};

// 日志工厂函数
function createLog(level, message) {
  switch (level) {
    case 'info':
      return new Log(message, 'INFO');
    case 'warning':
      return new Log(message, 'WARNING');
    case 'error':
      return new Log(message, 'ERROR');
    default:
      throw new Error('Invalid log level');
  }
}

// 使用工厂函数创建不同级别的日志对象
var infoLog = createLog('info', 'This is an informational message.');
var warningLog = createLog('warning', 'This is a warning message.');
var errorLog = createLog('error', 'This is an error message.');

// 显示日志信息
infoLog.display();      // [INFO] This is an informational message.
warningLog.display();   // [WARNING] This is a warning message.
errorLog.display();     // [ERROR] This is an error message.

// 示例2写法：
// 日志类
class Log {
  constructor(message, level) {
    this.message = message;
    this.level = level;
  }

  // 日志类的方法
  display() {
    console.log(`[${this.level}] ${this.message}`);
  }
}

// 日志工厂类
class LogFactory {
  static createLog(level, message) {
    switch (level) {
      case 'info':
        return new Log(message, 'INFO');
      case 'warning':
        return new Log(message, 'WARNING');
      case 'error':
        return new Log(message, 'ERROR');
      default:
        throw new Error('Invalid log level');
    }
  }
}

// 使用工厂类创建不同级别的日志对象
var infoLog = LogFactory.createLog('info', 'This is an informational message.');
var warningLog = LogFactory.createLog('warning', 'This is a warning message.');
var errorLog = LogFactory.createLog('error', 'This is an error message.');

// 显示日志信息
infoLog.display();      // [INFO] This is an informational message.
warningLog.display();   // [WARNING] This is a warning message.
errorLog.display();     // [ERROR] This is an error message.

// 示例写法3：使用super关键字
// 基础日志类
class Log {
  constructor(message, level) {
    this.message = message;
    this.level = level;
  }

  display() {
    console.log(`[${this.level}] ${this.message}`);
  }
}

// 错误日志子类
class ErrorLog extends Log {
  constructor(message) {
    super(message, 'ERROR'); // 使用 super 调用父类的构造函数
  }

  display() {
    // 可以在这里添加一些错误日志的特殊处理
    console.error(`[${this.level}] ${this.message}`); // 使用 console.error 来显示错误
  }
}

// 日志工厂类
class LogFactory {
  static createLog(level, message) {
    switch (level) {
      case 'info':
        return new Log(message, 'INFO');
      case 'warning':
        return new Log(message, 'WARNING');
      case 'error':
        return new ErrorLog(message); // 返回子类实例
      default:
        throw new Error('Invalid log level');
    }
  }
}

// 使用工厂类创建不同级别的日志对象
const infoLog = LogFactory.createLog('info', 'This is an informational message.');
const warningLog = LogFactory.createLog('warning', 'This is a warning message.');
const errorLog = LogFactory.createLog('error', 'This is an error message.');

// 显示日志信息
infoLog.display();      // [INFO] This is an informational message.
warningLog.display();   // [WARNING] This is a warning message.
errorLog.display();     // [ERROR] This is an error message

// 简单示例
class Creator {
  create(name) {
      return new Animal(name);
  }
}
class Animal {
  constructor(name) {
      this.name = name;
  }
}
var creator = new Creator();
var duck = creator.create('Duck');
console.log(duck.name); // Duck
var chicken = creator.create('Chicken');
console.log(chicken.name); // Chicken

// 三、观察者模式
// 应用场景：事件处理、数据绑定等
class NewsPublisher {
  constructor() {
      this.subscribers = [];
  }
  subscribe(observer) {
      this.subscribers.push(observer);
  }
  unsubscribe(observer) {
      this.subscribers = this.subscribers.filter(sub => sub !== observer);
  }
  notifyAll(news) {
      this.subscribers.forEach(sub => sub.update(news));
  }
  publishNews(news) {
      this.notifyAll(news);
  }
}
class NewsSubscriber {
  constructor(name) {
      this.name = name;
  }
  update(news) {
      console.log(`${this.name} 收到新闻: ${news}`);
  }
}
var publisher = new NewsPublisher();
var sub1 = new NewsSubscriber('订阅者A');
var sub2 = new NewsSubscriber('订阅者B');
publisher.subscribe(sub1);
publisher.subscribe(sub2);
publisher.publishNews('重大突发新闻！');

// 四、策略模式
// 应用场景：算法的封装、多态性实现等。
var levelObj = {
  "A": money => money * 4,
  "B": money => money * 3,
  "C": money => money * 2
}
var getMoney = (level, money) => levelObj[level](money);
console.log(getMoney('A', 200)); // 800

// 五、装饰器模式
// 应用场景： 动态地给一个对象添加一些额外的职责。用于动态地给一个对象添加额外的职责，例如给某个组件添加日志记录功能。
// 示例写法1：基础写法
class Coffee {
  cost() {
      return 1;
  }
}
class Milk {
  constructor(coffee) {
      this.coffee = coffee;
  }
  cost() {
      return this.coffee.cost() + 0.5;
  }
}
class Whip {
  constructor(coffee) {
      this.coffee = coffee;
  }
  cost() {
      return this.coffee.cost() + 0.2;
  }
}
var basicCoffee = new Coffee();
var milkCoffee = new Milk(basicCoffee);
var whipMilkCoffee = new Whip(milkCoffee);
console.log(whipMilkCoffee.cost()); // 输出: 1.7

// 示例写法2：使用ES6的class和extends关键字
class Coffee {
  cost() {
    return 1;
  }
}

class MilkCoffeeDecorator extends Coffee {
  constructor(...args) {
    super();
    this._coffee = new Coffee(...args);
  }

  cost() {
    return this._coffee.cost() + 0.5;
  }
}

class WhipCoffeeDecorator extends Coffee {
  constructor(...args) {
    super();
    this._coffee = new MilkCoffeeDecorator(...args);
  }

  cost() {
    return this._coffee.cost() + 0.2;
  }
}

const basicCoffee = new Coffee();
console.log(`Cost of basic coffee: ${basicCoffee.cost()} USD`);

const milkCoffee = new MilkCoffeeDecorator();
console.log(`Cost of milk coffee: ${milkCoffee.cost()} USD`);

const whipMilkCoffee = new WhipCoffeeDecorator();
console.log(`Cost of whip milk coffee: ${whipMilkCoffee.cost()} USD`);



// 六、适配器模式
// 应用场景：将一个类的接口转换成客户希望的另外一个接口。用于将一个类的接口转换成另一个类的接口，例如将不同数据源返回的数据格式统一成统一格式。
class OldLock {
  unlock() {
      console.log('Old lock unlocked');
  }
}

class NewLock {
  unlockWithCard() {
      console.log('New lock unlocked with card');
  }
}

class Adapter {
  constructor(newLock) {
      this.newLock = newLock;
  }
  unlock() {
      this.newLock.unlockWithCard();
  }
}

var oldLock = new OldLock();
var newLock = new NewLock();
var adaptedLock = new Adapter(newLock);
oldLock.unlock();
adaptedLock.unlock();

// 七、代理模式
// 应用场景： 用于控制对某个对象的访问。例如对某个重要操作进行权限控制。
var imgFunc = (() => {
  let imgNode = document.createElement('img');
  document.body.appendChild(imgNode);
  return {
      setSrc: (src) => {
          imgNode.src = src;
      }
  }
})();
var ProxyImg = (() => {
  let img = new Image();
  img.onload = () => {
      let node = document.getElementsByTagName('img');
      imgFunc.setSrc(img.src);
  }
  return {
      setSrc: (src) => {
          imgFunc.setSrc('../C3photo/jacky/1.jpg');
          img.src = src;
      }
  }
})();
ProxyImg.setSrc('../C3photo/jacky/2.jpg');
// 八、组合模式
// 应用场景：将对象组合成树形结构以表示“部分-整体”的层次结构。用于将对象组合成树形结构，例如构建复杂的导航菜单。
class Menu {
  constructor(name) {
      this.name = name;
      this.children = [];
  }
  add(menu) {
      this.children.push(menu);
  }
  remove(menu) {
      this.children = this.children.filter(item => item !== menu);
  }
  display(indent = 0) {
      console.log(' '.repeat(indent) + this.name);
      this.children.forEach(item => item.display(indent + 2));
  }
}

var rootMenu = new Menu('Root Menu');
var fileMenu = new Menu('File');
var editMenu = new Menu('Edit');

rootMenu.add(fileMenu);
rootMenu.add(editMenu);

fileMenu.add(new Menu('New'));
fileMenu.add(new Menu('Open'));

editMenu.add(new Menu('Undo'));
editMenu.add(new Menu('Redo'));

rootMenu.display();