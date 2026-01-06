// Proxy server for Hue Bridge API calls
// This server acts as a middleware between the frontend and the Hue bridge
// to bypass browser CORS (Cross-Origin Resource Sharing) restrictions

const http = require('http');
const https = require('https');
const url = require('url');

const PORT = 3000;
const HUE_BRIDGE_IP = '192.168.50.206';

// Create the proxy server
const server = http.createServer((req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Parse the request URL
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    // Extract the path after /proxy/
    const hueApiPath = pathname.replace('/proxy', '');

    // Build the full URL to the Hue bridge
    const hueUrl = `http://${HUE_BRIDGE_IP}${hueApiPath}`;

    console.log(`${req.method} ${req.url} -> ${hueUrl}`);

    // Prepare options for the request to Hue bridge
    const options = {
        hostname: HUE_BRIDGE_IP,
        path: hueApiPath,
        method: req.method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Handle request body for PUT/POST requests
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        if (body) {
            options.headers['Content-Length'] = Buffer.byteLength(body);
        }

        // Make the request to the Hue bridge
        const hueRequest = http.request(options, (hueResponse) => {
            let hueData = '';

            hueResponse.on('data', chunk => {
                hueData += chunk.toString();
            });

            hueResponse.on('end', () => {
                // Send the response back to the client
                res.writeHead(hueResponse.statusCode, hueResponse.headers);
                res.end(hueData);
            });
        });

        hueRequest.on('error', (error) => {
            console.error('Error connecting to Hue bridge:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Failed to connect to Hue bridge', details: error.message }));
        });

        if (body) {
            hueRequest.write(body);
        }
        hueRequest.end();
    });
});

server.listen(PORT, () => {
    console.log(`Hue Bridge Proxy Server running on http://localhost:${PORT}`);
    console.log(`Requests to http://localhost:${PORT}/proxy/* will be forwarded to http://${HUE_BRIDGE_IP}/*`);
});
