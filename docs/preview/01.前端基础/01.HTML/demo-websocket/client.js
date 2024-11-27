// client.js
const socket = new WebSocket('ws://localhost:8080');

// 连接打开时的回调
socket.onopen = function(event) {
    console.log('WebSocket is open now.');
};

// 监听服务器发送的消息
socket.onmessage = function(event) {
    console.log('Message from server: ', event.data);
    // 显示消息在页面上
    displayMessage(event.data, false); // false 表示是对方发送的消息
};

// 处理连接关闭事件
socket.onclose = function(event) {
    console.log('WebSocket is closed now.');
};

// 处理错误事件
socket.onerror = function(error) {
    console.error('WebSocket error: ', error);
};

// 发送消息按钮事件
function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value;
    if (message) {
        socket.send(message);
        displayMessage(message, true); // true 表示是自己发送的消息
        input.value = ''; // 清空输入框
    }
}

// 显示消息的函数
function displayMessage(message, isMyMessage) {
    const messagesDiv = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.className = 'message ' + (isMyMessage ? 'my-message' : 'other-message');
    messageElement.textContent = message;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // 自动滚动到最新消息
}