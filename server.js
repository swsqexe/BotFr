const app = require('express')();

app.get('/', (req, res) => res.send('Subscribe To Pengu'));

module.exports = () => {
  app.listen(3000);
}