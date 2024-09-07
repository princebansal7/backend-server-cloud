# backend-server-cloud

**Endpoints:**
- Get random todos (min: 1, max: 20)
  - GET: `/todos`
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
  - GET: `/todo/7`
    ```json
    {
        "id": 7,
        "title": "Todo Title 7",
        "description": "Description for todo 7",
        "completed": false
    }
    ```

- Get Sum of 2 numbers
  - GET: `/sum?a=10&b=20`
    ```json
    {
        "sum": 30
    }
    ```

- Get simple interest 
  - GET: `/si?p=1000&r=2&t=5`
    ```json
    {
        "simpleInterest": 100,
        "totalAmount": 1100
    }
    ```

## Reverse proxy using nginx and Certificate management

- **NGINX**
  
    nginx is open-source software for web serving, reverse proxying, caching, load balancing, media streaming, and more. It can function as a proxy server for email (IMAP, POP3, and SMTP) and a reverse proxy and load balancer for HTTP, TCP, and UDP servers.

- For this, you need to have a domain. Add an `A record` in your DNS with the AWS machine IP and the corresponding subdomains.

- Installing NGINX on VM (automatically starts NGINX server on port 80):
    ```bash
    sudo apt update
    sudo apt install nginx
    ```

- Creating reverse proxy:
    ```bash
    sudo rm sudo vi /etc/nginx/nginx.conf
    sudo vi /etc/nginx/nginx.conf
    ```

- Add your subdomain where you want NGINX to proxy the request:
    ```nginx
    events {
        # Event directives...
    }

    http {
        server {
            listen 80;
            server_name sum.princebansal.tech; # my subdomain

            location / {
                proxy_pass http://localhost:8080; # port where backend is listening
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
            }
        }

        server {
            listen 80;
            server_name todos.princebansal.tech; # my subdomain 2

            location / {
                proxy_pass http://localhost:8081; # another port where backend is listening
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
            }
        }

        # You can add more servers like that
    }
    ```

- Reload NGINX:
    ```bash
    sudo nginx -s reload
    ```


- For free **Certificate Management** for `https`, check [Certbot](https://certbot.eff.org/instructions?ws=nginx&os=snap):
  - Select software as `nginx` and system as `VM` machine type (`Ubuntu` or `Linux`).
  - Follow steps and execute commands. It will automatically add public-private cert keys in the NGINX conf file.

- To keep the server always running on VM, use the command (it will keep running the backend even if you quit the shell):
    ```bash
    pm2 start index.js
    ```


    jwlncwcl