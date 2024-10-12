---
title: Web Worker使用
author: Ajianxian
createTime: 2024/10/10 13:44:21
tags:
  - Html5
  - webworker
permalink: /article/fvvezj5b/
---

### 引言
   随着Web应用变得越来越复杂，传统的单线程JavaScript模型已经无法满足现代Web应用的需求。Web Workers的出现，为Web开发带来了革命性的变化。它允许JavaScript在后台线程中运行脚本，而不影响页面的性能。

### 一、基本概念
1. **基本概念**
   - Web Workers 是一种在浏览器中实现多线程的技术，它允许你在后台线程中运行 JavaScript 代码，而不会阻塞用户界面的响应。这对于执行计算密集型或高延迟的任务特别有用，因为这些任务可以在不冻结用户界面的情况下完成。
2. **工作原理**
   - Web Workers 通过创建一个独立的线程来运行代码，这个线程与主线程分离，两者之间通过消息传递进行通信。Worker 线程可以执行几乎任何 JavaScript 代码，但不能直接访问 DOM。主线程和 Worker 线程之间的数据传递是通过结构化克隆算法实现的，这意味着数据在传递过程中会被序列化和反序列化。
3. **使用场景**
- 数据处理和分析：例如，对大量数据进行排序或搜索操作。
- 图像处理：在不阻塞 UI 的情况下，对图像进行滤镜应用或像素操作。
- 文件操作：例如，读取、解析或转换大型文件。
- 实时通信：在聊天应用中，处理消息的加密和解密。

### 二、基本用法
  在实际项目中，我们可以通过以下步骤创建和使用 Web Workers：

1. **创建 Worker 实例**：使用 `new Worker('worker.js')` 创建一个新的 Worker 实例，其中 `'worker.js'` 是包含要在 Worker 线程中执行的代码的文件。

2. **发送消息给 Worker**：通过 `postMessage` 方法，主线程可以向 Worker 发送消息。

3. **接收 Worker 的消息**：在主线程中设置 `onmessage` 事件监听器来接收来自 Worker 的消息。

4. **终止 Worker**：当 Worker 线程的任务完成后，可以通过调用 `terminate` 方法来终止 Worker 线程。

### 三、简单示例
```javascript
// app.js
const worker = new Worker('worker.js');// 需使用网络URI路径

worker.onmessage = function(e) {
  console.log('Message received from worker: ' + e.data);
};

worker.postMessage('Hello!');

// worker.js
onmessage = function(e) {
  const result = performHeavyCalculation();
  postMessage(result);
};

function performHeavyCalculation() {
  // 执行一些计算密集型任务
  let sum = 0;
  for (let i = 0; i < 1000000000; i++) {
      sum += i;
  }
  return sum;
}
```
### 四、完整DEMO
1. 使用以下代码分别新建三个同级文件index.html、app.js、worker.js；
2. 关闭app.js中本地文件测试webworker的方法部分代码注释，修改worker的文件路径为磁盘绝对路径并保存；
2. 点击打开index.html文件，点击Start Worker按钮即可在控制台看到效果。
```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Web Workers Example</title>
</head>
<body>
    <h1>Web Workers Example</h1>
    <button id="startButton">Start Worker</button>
    <button id="stopButton" disabled>Stop Worker</button>
    <script src="app.js"></script>
</body>
</html>
```

```javascript
// app.js
let worker = null;
let timer = null;

// 函数用于创建和初始化 Worker
function createWorker() {
    if (worker) {
        return; // 如果已经创建了 Worker，不做任何操作
    }
    // 创建一个新的 Web Worker
    worker = new Worker('worker.js'); // 需使用网络URL路径

   // 使用本地文件来测试webworker的方法：
   // 以下文件地址需要改为文件绝对路径，通过Blob对象来解决加载远程脚本或者绕过同源策略的限制问题
    // const blob = new Blob(['importScripts("file:///E:/xxxx/worker.js")'], { type: 'application/javascript' });
    // const blobUrl = window.URL.createObjectURL(blob);
    // worker = new Worker(blobUrl);

    // 监听来自 Worker 的消息
    worker.onmessage = function(e) {
        console.log('Message received from worker:', e.data);
        document.getElementById('stopButton').disabled = false;
    };

    // 监听 Worker 错误
    worker.onerror = function(error) {
        console.error('Worker error:', error);
    };
}

// 函数用于发送消息给 Worker
function sendMessageToWorker(message) {
    if (worker) {
        worker.postMessage(message);
    } else {
        console.error('Worker not initialized');
    }
}

// 函数用于终止 Worker
function terminateWorker() {
    if (worker) {
        worker.terminate();
        worker = null;
        document.getElementById('startButton').disabled = false;
        document.getElementById('stopButton').disabled = true;
        clearInterval(timer);
    }
}

// 监听按钮点击事件
document.getElementById('startButton').addEventListener('click', function() {
    this.disabled = true;
    createWorker();
    sendMessageToWorker('start'); // 发送消息给 Worker
    timer = setInterval(() => {
        // console.log("执行主线程任务", Math.random());
    }, 1000);
    console.log("开始Worker")
});

document.getElementById('stopButton').addEventListener('click', function() {
    terminateWorker();
    console.log("停止Worker")
});
```
```javascript
// worker.js
let subTimer = null;
self.onmessage = function(e) {
  if (e.data === 'start') {
    console.log("111");
    let subTimer = setInterval(() => {
      console.log("执行worker任务", Math.random());
    }, 100);
    console.log("222");
    
    // 执行异步的耗时任务
    // 长时间运行的任务会阻塞JavaScript的事件循环，导致上述定时器的回调函数无法执行。
    // 为了解决这个问题，可以将长任务分解成小块，并在每个小块之间使用setTimeout来让出执行权，确保定时器的回调有机会在每个小块执行之间运行。
    performLongTask().then(() => {
      console.log("333");
      clearInterval(subTimer);
      console.log("444");
    });
  }
};

async function performLongTask() {
  let sum = 0, i = 0;
  while (i < 100000000) {
    sum += i;
    i++;
    if (i % 1000000 === 0) {
      // worker内部存在耗时任务和异步操作，需要两者同步执行时的解决方法
      await new Promise(resolve => setTimeout(resolve, 0));
      self.postMessage({progress: ((i / 100000000) * 100).toFixed(0)});
    }
  }
  console.log({sum});
  self.postMessage({sum});
}

```

通过这些示例，我们可以看到 Web Workers 如何帮助我们优化网页应用的性能，特别是在处理复杂或耗时的任务时。希望这些信息能帮助您在自己的项目中有效地使用 Web Workers。

