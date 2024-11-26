require('dotenv').config();
const PORT = process.env.PORT || 5000;

const app = require('./app.js');

app.get('/', (req, res) => {
  res.send('Hello, World! Node.js + Express Server is running');
});

app.listen(PORT, () => {
  console.log(`Сервак запущен на порту: ${PORT}`);
});
