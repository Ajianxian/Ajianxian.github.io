// 应用场景：用于创建不同类型的对象，例如创建不同类型的组件、创建不同类型的数据请求等。
// 构造函数
function Log(message, level){
  this.message = message;
  this.level = level;
}
// 日志对象的方法
Log.prototype.display = function() {
  console.log(`[${this.level}] ${this.message}`);
}

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
      throw new Error('Invalid log level');')
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

var infoLog = LogFactory.createLog('info', 'This is an informational message.');
var warningLog = LogFactory.createLog('warning', 'This is a warning message.');
var errorLog = LogFactory.createLog('error', 'This is an error message.');
infoLog.display();
warningLog.display();
errorLog.display();



// 使用super关键字
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
  constructor(message, level) {
    super(message, level);
  }
  display() {
    // 可添加错误日志的额外处理
    console.error(`[${this.level}] ${this.message}`)
  }
}
class LogFactory {
  static createLog(level, message) {
    switch (level) {
      case 'info':
        return new Log(message, 'INFO');
      case 'warning':
        return new Log(message, 'WARNING');
      case 'error':
        return new ErrorLog(message, 'ERROR');
      default:
        throw new Error('Invalid log level');
    }
  }
}
var infoLog = LogFactory.createLog('info', 'This is an informational message.');
var warningLog = LogFactory.createLog('warning', 'This is a warning message.');
var errorLog = LogFactory.createLog('error', 'This is an error message.');
infoLog.display();
warningLog.display();
errorLog.display();
