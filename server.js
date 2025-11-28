const express = require('express'); //Рядок 1
 const app = express(); //Рядок 2
 const port = process.env.PORT || 5000; //Рядок 3

 // Повідомлення про те, що сервер запущений і прослуховує зазначений порт 
app.listen(port, () => console.log(`Listening on port ${port}`)); //Рядок 6

 // Створення GET маршруту
 app.get('/', (req, res) => { //Рядок 9
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Рядок 10
 }); //Рядок 11
