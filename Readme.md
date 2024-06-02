### Create DB with Docker

```sh
docker run --name todolist -p 5432:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=secret -d postgres:16-alpine
```
