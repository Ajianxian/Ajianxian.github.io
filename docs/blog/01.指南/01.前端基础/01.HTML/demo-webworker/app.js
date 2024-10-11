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
    //  const blob = new Blob(['importScripts("file:///E:/xxxx/worker.js")'], { type: 'application/javascript' });
    //  const blobUrl = window.URL.createObjectURL(blob);
    //  worker = new Worker(blobUrl);

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