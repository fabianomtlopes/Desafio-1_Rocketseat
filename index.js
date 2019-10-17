const express = require('express');

const server = express();

server.use(express.json());

const projects = [];

/* Midlleware para verificacao de existencia do objto, */
function checkProject(req, res, next){
  const { id } = req.params;
  const project = projects.find(pro => pro.id == id);

  if(!project){
    return res.status(400).json({message: "Doesn't exists this project."});
  }

  return next();
}


//Projects
server.post('/projects', (req, res) => {

  const { id,title } = req.body;
  const project = {
    id,
    title,
    tasks:[]
  }
  projects.push(project);
  return res.json(projects);
});

//Pegar todos os projetos e listar
server.get('/projects', (req, res) => {
  return res.json(projects);
});
//Alterar o titulo do id encontrado
server.put('/projects/:id', checkProject, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find( pro => pro.id == id);
  project.title = title;

  return res.json(project);
});

//Excluir o objeto do array
server.delete('/projects/:id', checkProject, (req, res) => {
  const { id } = req.params;
  const projectIndex = projects.findIndex(pro => pro.id == id);
  projects.splice(projectIndex,1);
  return res.send();
});

//Tasks
server.post('/projects/:id/tasks', checkProject, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(pro => pro.id == id);
  project.tasks.push(title);
  return res.json(project);
});

// server.get('/projects', (req, res) => {
//   const 
// });

server.listen(3001);