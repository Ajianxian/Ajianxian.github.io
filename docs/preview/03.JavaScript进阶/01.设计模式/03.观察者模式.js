
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



// vue
