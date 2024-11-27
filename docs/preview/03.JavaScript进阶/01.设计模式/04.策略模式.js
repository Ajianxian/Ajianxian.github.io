// 应用场景：算法的封装、多态性实现等。
// 定义一个策略对象
const strategies = {
  add: function(a, b) {
    return a + b;
  },
  subtract: function(a, b) {
    return a - b;
  },
  multiply: function(a, b) {
    return a * b;
  },
  divide: function(a, b) {
    return a / b;
  }
};

// 定义一个执行操作的函数
function executeOperation(operation, a, b) {
  if (strategies.hasOwnProperty(operation)) {
    return strategies[operation](a, b);
  } else {
    throw new Error('Unsupported operation');
  }
}

// 使用示例
console.log(executeOperation('add', 5, 3)); // 输出: 8
console.log(executeOperation('subtract', 5, 3)); // 输出: 2
console.log(executeOperation('multiply', 5, 3)); // 输出: 15
console.log(executeOperation('divide', 6, 2)); // 输出: 3
console.log(executeOperation('power', 2, 3)); // 抛出错误：Unsupported operation
