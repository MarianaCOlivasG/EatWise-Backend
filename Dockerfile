# Usar una imagen base de Node.js
FROM node:18-alpine

# Establecer el directorio de trabajo en la carpeta de la aplicación
WORKDIR /usr/src/app

# Copiar los archivos de configuración y dependencias del proyecto
COPY package*.json tsconfig.json ecosystem.config.js ./

# Instalar PM2 y dependencias en una sola capa para reducir tamaño de la imagen
RUN npm install -g pm2 && npm install

# Copiar los archivos compilados desde la carpeta dist
COPY . .

# Construye la aplicación
RUN npm run build

# Expone el puerto de la aplicación
EXPOSE 3500

# Iniciar la aplicación con PM2
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
