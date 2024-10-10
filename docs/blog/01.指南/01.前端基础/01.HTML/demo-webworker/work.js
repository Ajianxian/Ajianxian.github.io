// 一、基础示例
// // 监听来自主线程的消息
// self.onmessage = function(e) {
//   if (e.data === 'start') {
//       performLongTask();
//     }
// };

// // 执行一个耗时的任务
// function performLongTask() {
//   let sum = 0;
//   for (let i = 0; i < 100000000; i++) {
//       sum += i;
//   }
//   console.log({sum})
//   self.postMessage({sum}); // 将结果发送回主线程
// }


// 二、尝试在worker线程中执行耗时任务时，异步执行定时器内代码，结果失败
// let subTimer = null;
// self.onmessage = function(e) {
//   if (e.data === 'start') {
//     console.log("111");
//     // 试验失败：定时器的回调函数和 performLongTask 函数是并发的，但它们共享同一个线程。如果 performLongTask 函数占用了线程，定时器的回调函数就会被阻塞，直到 performLongTask 函数执行完毕。
//     // 预期输出顺序：111→222→定时器内部输出→333→444；
//     // 实际输出顺序：111→222→333→444，定时器被清空未执行
//     subTimer = setInterval(() => {
//         console.log("执行worker任务", Math.random());
//     }, 100);
//     console.log("222");
//     processLongTask();
//     console.log("333");
//     clearInterval(subTimer);
//     console.log("444");
//   }
// };

// function processLongTask() {
//   let sum = 0;
//   for (let i = 0; i < 100000000; i++) {
//       sum += i;
//   }
//   // console.log({sum});
//   self.postMessage({sum});
// }



// 三、在耗时任务时执行异步操作
let subTimer = null;
self.onmessage = function(e) {
  if (e.data === 'start') {
    console.log("111");
    let subTimer = setInterval(() => {
      console.log("执行worker任务", Math.random());
    }, 100);
    console.log("222");
    
    // 执行异步的耗时任务
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
    // 通过 yield 控制权，让出执行机会
    if (i % 1000000 === 0) {
      await new Promise(resolve => setTimeout(resolve, 0));
      self.postMessage({progress: ((i / 100000000) * 100).toFixed(0)});
    }
  }
  console.log({sum});
  self.postMessage({sum});
}
