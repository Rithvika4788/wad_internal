const http = require("http");
const os = require("os");
const path = require("path");
const EventEmitter = require("events");

const eventEmitter = new EventEmitter();

eventEmitter.on("request_received", (url) => {
    console.log(`Request received for: ${url}`);
});

// 🔹 Common CSS
const style = `
<style>
    * {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        font-family: 'Segoe UI', Tahoma, sans-serif;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(135deg, #667eea, #764ba2);
    }

    .container {
        background: #fff;
        padding: 40px;
        border-radius: 12px;
        width: 420px;
        text-align: center;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }

    h2 {
        margin-bottom: 25px;
        color: #333;
    }

    .btn-group {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    a {
        display: block;
        padding: 12px;
        background: #667eea;
        color: white;
        text-decoration: none;
        border-radius: 8px;
        font-weight: 500;
        transition: all 0.3s ease;
    }

    a:hover {
        background: #5a67d8;
        transform: translateY(-2px);
    }

    .info {
        text-align: left;
        margin-top: 20px;
    }

    .info p {
        background: #f5f5f5;
        padding: 10px;
        border-radius: 6px;
        margin: 10px 0;
    }

    .back {
        margin-top: 20px;
        display: inline-block;
    }
</style>
`;

const server = http.createServer((req, res) => {

    eventEmitter.emit("request_received", req.url);

    // 🔹 HOME
    if (req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`
            ${style}
            <div class="container">
                <h2>Custom Node Server</h2>
                <div class="btn-group">
                    <a href="/os">OS Info</a>
                    <a href="/path">Path Info</a>
                    <a href="/event">Event Demo</a>
                </div>
            </div>
        `);
    }

    // 🔹 OS MODULE
    else if (req.url === "/os") {
        res.writeHead(200, { "Content-Type": "text/html" });

        res.end(`
            ${style}
            <div class="container">
                <h2>OS Module Info</h2>
                <div class="info">
                    <p><strong>Platform:</strong> ${os.platform()}</p>
                    <p><strong>CPU Architecture:</strong> ${os.arch()}</p>
                    <p><strong>Free Memory:</strong> ${os.freemem()}</p>
                    <p><strong>Total Memory:</strong> ${os.totalmem()}</p>
                </div>
                <a class="back" href="/">Back</a>
            </div>
        `);
    }

    // 🔹 PATH MODULE
    else if (req.url === "/path") {
        const filePath = path.join(__dirname, "server.js");

        res.writeHead(200, { "Content-Type": "text/html" });

        res.end(`
            ${style}
            <div class="container">
                <h2>Path Module Info</h2>
                <div class="info">
                    <p><strong>File Name:</strong> ${path.basename(filePath)}</p>
                    <p><strong>Directory:</strong> ${__dirname}</p>
                    <p><strong>Extension:</strong> ${path.extname(filePath)}</p>
                </div>
                <a class="back" href="/">Back</a>
            </div>
        `);
    }

    // 🔹 EVENT MODULE
    else if (req.url === "/event") {

        eventEmitter.once("custom_event", () => {
            console.log("Event page visited at:", new Date().toLocaleString());
        });

        eventEmitter.emit("custom_event");

        res.writeHead(200, { "Content-Type": "text/html" });

        res.end(`
            ${style}
            <div class="container">
                <h2>Event Module Demo</h2>
                <p>Check console for event message!</p>
                <a class="back" href="/">Back</a>
            </div>
        `);
    }

    // 🔹 404
    else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end(`
            ${style}
            <div class="container">
                <h2>404 - Page Not Found</h2>
                <a class="back" href="/">Go Home</a>
            </div>
        `);
    }
});

server.listen(3001, () => {
    console.log("Server running at http://localhost:3001");
});