# eMarket

🚀 Instalación y configuración

1️⃣ Clonar el repositorio

git clone

2️⃣ Instalar dependencias

npm install

3️⃣ Configurar variables de entorno

Crea un archivo .env en la raíz del proyecto basándote en .env.example y completa las claves sensibles necesarias

cp .env.example .env

4️⃣ Inicializar la base de datos

npx prisma generate

npx prisma migrate dev --name init

5️⃣ Poblar la base de datos con el admin

npx ts-node seed.ts

6️⃣ Iniciar el servidor

npm run dev

📄 Swagger disponible en: http://localhost:3000/api/docs

✔ Documentación interactiva sin necesidad de escribir archivos manuales.

✔ Mejora la experiencia de desarrollo permitiendo probar los endpoints desde el navegador.

✔ Se mantiene actualizada conforme cambia tu código.

✔ Evita errores gracias a los tipos de TypeScript.

📌 Elección del Sistema de Base de Datos y Arquitectura

Base de Datos: Se eligió PostgreSQL por su estabilidad, escalabilidad y soporte para transacciones ACID.

ORM: Prisma facilita la gestión de datos con consultas eficientes y tipadas.

Framework: Express.js fue seleccionado por su flexibilidad y rendimiento en APIs REST.

Autenticación: Se implementó JWT + middleware de autenticación para control de acceso.

🔹 Stack Tecnológico Principal: Express.js | Prisma | PostgreSQL | Swagger | Joi

Recuerda autorizarte con tu token JWT en la esquina superior derecha del swagger

![alt text](<Screenshot 2025-03-01 at 9.35.39 PM.png>)
