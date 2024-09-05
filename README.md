# backend-server-cloud

**Endpoints:**
- Get random todos (min:1, max:20)
  - GET: /todos
    ```json
        {
            "todos": [
                {
                    "id": 1,
                    "title": "Todo Title 1",
                    "description": "Description for todo 1",
                    "completed": false
                },
                {
                    "id": 2,
                    "title": "Todo Title 2",
                    "description": "Description for todo 2",
                    "completed": false
                }
            ]
        }
    ```
- Get todos by id
  - GET: /todo/7
    ```json
        {
            "id": 7,
            "title": "Todo Title 7",
            "description": "Description for todo 7",
            "completed": false
        }
    ```
  
- Get Sum of 2 numbers
  - GET: /sum?a=10&b=20
     ```json
        {
            "sum":30
        }
     ```
- Get simple interest 
  - GET: /si?p=1000&r=2%t=5
    ```json
        {
            "simpleInterest": 100,
            "totalAmount": 1100
        }
    ```

## Reverse proxy using nginx and Certificate management

- NGINX: NGINX is open source software for web serving, reverse proxying, caching, load balancing, media streaming, and more. It started out as a web server designed for maximum performance and stability. In addition to its HTTP server capabilities, NGINX can also function as a proxy server for email (IMAP, POP3, and SMTP) and a reverse proxy and load balancer for HTTP, TCP, and UDP servers.
- For this you need to have an domain, if you do then add `A record` in your DNS with AWS machine ip and add corresponding sub-domains
- Installing nginx on VM (automatically starts nginx server on port 80)
    ```sh
        sudo apt update
        sudo apt install nginx
    ```
- Creating reverse proxy
    ```sh
        sudo rm sudo vi /etc/nginx/nginx.conf
        sudo vi /etc/nginx/nginx.conf
    ```    
- Add your sub-domain where you want nginx to proxy the request
    ```conf
        events {
        # Event directives...
        }

        http {
            server {
                listen 80;
                server_name sum.princebansal.tech; // my sub-domain

                location / {
                proxy_pass http: //localhost:8080; // port where backend is listening
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
                }
            }
            server {
                listen 80;
                server_name todos.princebansal.tech; // my sub-domain 2

                location / {
                proxy_pass http: //localhost:8081; // another port where backend is listening
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
                }
            }
            // ...
            // ...
            // can add more severs like that
        }
    ```
- Reload nginx
    ```sh
        sudo nginx -s reload
    ```       
- For Free certificate management for `https` check [Certbot](https://certbot.eff.org/instructions?ws=nginx&os=snap)
  - select software as `nginx` and system as `VM machine` type `Ubuntu` or `Linux`
  - follow steps and execute commands, it will automatically add public-private cert keys and stuff in nginx conf file automatically
- To keep server always running on VM, use command (it will keep running backend even if you quit the shell)
    ```sh
        pm2 start index.js
    ``` 