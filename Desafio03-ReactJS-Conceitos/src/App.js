import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {

  const [repositories, setRepositore] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositore(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Repositório ${Date.now()}`,
      url: "https://github.com/sleduardo20",
      techs: ["React", "NodeJS", "CSS"]
    })
    const repositorie = response.data

    setRepositore([...repositories, repositorie])
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`, { id })
      setRepositore(repositories.filter(repositore => repositore.id != id))
    }

    catch (error) {
      alert('Erro ao excluir o repositorio, tente novamente')
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositorie =>
          <li key={repositorie.id}>
            {repositorie.title}
            <button onClick={() => handleRemoveRepository(repositorie.id)}> Remover </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
