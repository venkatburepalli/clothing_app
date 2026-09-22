# Clothing App - Node.js

## Run locally

```bash
npm install
npm start
```

Open:

http://localhost:3000

## Run with Docker

```bash
docker build -t clothing-app:1.0 .
docker run -d --name clothing_app -p 8082:3000 clothing-app:1.0
```

Open:

http://<EC2-PUBLIC-IP>:8082

## Health check

http://<EC2-PUBLIC-IP>:8082/health

## Project structure

clothing_app/
├── package.json
├── server.js
├── Dockerfile
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
└── images/
    ├── tshirt.jpg
    ├── jeans.jpg
    ├── shirt.jpg
    └── hoodie.jpg

Note: Add your own clothing JPG images to the images folder using these filenames.
