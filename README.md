# thordo

node --experimental-modules index.js



curl -d '{ "id": "1000", "status": "true", "userId": "1", "title": "Título", "description": "Descrição da task" }' -H 'Content-type: application/json' http://localhost:3001/tasks