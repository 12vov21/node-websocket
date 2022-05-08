var ws = require("nodejs-websocket")

// 创建连接通道数组
var connList = []



// 创建websocket服务器, conn -> 连接通道
var server = ws.createServer(function (conn) {
    connList.push(conn)
    // 与客户端的连接成功
    console.log("客户端已连接", connList.length)
    // 接收客户端发来的数据
    conn.on("text", function (str) {
        // 打印接收到的数据
        console.log("接收到数据：" + str)
        // 遍历连接数组
        for (var i = 0; i < connList.length; i++) {
            // 将数据发送到当前连接客户端
            connList[i].sendText(str.toUpperCase() + "!!!")
        }
    })
    // 关闭连接
    conn.on("close", function (code, reason) {
        console.log("当前连接被关闭！===>", reason)
    })
}).listen(7788, function () {
    console.log("当前连接通道为7788");
})