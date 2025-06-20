const bcrypt = require('bcryptjs');
bcrypt.hash('temp1234', 10).then(console.log);
