Pre-requisite:

1. MongoDB Community Edition
2. Mongo Compass

Steps:
1. create .env file at the root with content

MongoDB_CST=mongodb://20.198.101.210:27017/clientconfig // for localhost: mongodb://localhost/clientconfig (if not working replace localhost with 127.0.0.1)
PORT=5000
JWTSECKEY=test123dsuelbgy

2. Do npm install
3. Run nodemon (this command will refresh the server on every run)

