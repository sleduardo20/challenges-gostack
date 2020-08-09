const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.status(200).json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body
  const repositorie = { id: uuid(), title, url, techs, likes: 0 }

  repositories.push(repositorie)

  response.status(200).json(repositorie)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const { title, url, techs } = request.body
  const repositorieIndex = repositories.findIndex(repositore => repositore.id === id)

  if (repositorieIndex < 0) {
    return response.status(400).json({ message: "ID invalid" })
  }

  const like = repositories[repositorieIndex].likes

  const repositore = { id, title, url, techs, likes: like }

  repositories[repositorieIndex] = repositore
  return response.status(200).json(repositore)

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params
  const repositorieIndex = repositories.findIndex(repositore => repositore.id === id)

  if (repositorieIndex < 0) {
    return response.status(400).json({ message: "ID invalid" })
  }

  repositories.splice(repositorieIndex, 1)

  return response.status(204).send()

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params
  const repositorieIndex = repositories.findIndex(repositore => repositore.id === id)

  if (repositorieIndex < 0) {
    return response.status(400).json({ message: "ID invalid" })
  }

  repositories.map(repositore => {
    if (repositore.id === id) {
      repositore.likes++
    }
  })

  const like = repositories[repositorieIndex].likes

  response.status(200).json({ likes: like })
});

module.exports = app;
