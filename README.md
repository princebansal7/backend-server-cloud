# backend-server-cloud

## Endpoints

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
