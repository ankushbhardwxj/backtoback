## Todo app using React Redux 

- Written in Typescript in 118 lines. 
- Dockerized

## Build using docker

To start react app using Docker, run

```
# build the application
docker build . -t todoapp

# run the application on a port
docker run -d -it -p 3000:3000 --name todoapp todoapp:latest
```
Open `localhost:3000`.
