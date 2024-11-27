// 观察者模式
class NewsPublisher{
  constructor() {
    // 发布者列表
    this.subscribers = [];
  }
  // 添加发布者
  subscribe(observer) {
    this.subscribers.push(observer);
  }
  // 移除发布者
  unsubscribe(observer) {
    this.subscribers = this.subscribers.filter(sub => sub !== observer);
  }
  notifyAll(news) {
    this.subscribers.forEach(sub => sub.update(news));
  }
  publish(news) {
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

// 四、策略模式
var levelObj = {
  "A": function(money) {
    return money * 3;
  },
  "B": function(money) {
    return money * 2;
  },
  "C": function(money) {
    return money * 1;
  }
};
var getMoney = function(level, money) {
  return levelObj[level](money);
};
getMoney("A", 100);

// 装饰器模式
class Coffee {
  cost() {
    return 1;
  }
}
class MilkCoffeeDecorator extends Coffee {
  constructor (...args) {
    super();
    this._coffee = new Coffee(...args);
  }
  cost() {
    return this._coffee.cost() + 0.5;
  }
}
class WhipCoffeeDecorator extends Coffee {
  constructor (...args) {
    super();
    this._coffee = new MilkCoffeeDecorator(...args);
  }
  cost() {
    return this._coffee.cost() + 0.2;
  }
}
const basicCoffee = new Coffee();
const milkCoffee = new MilkCoffeeDecorator();
const whipMilkCoffee = new WhipCoffeeDecorator();
