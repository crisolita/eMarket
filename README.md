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
