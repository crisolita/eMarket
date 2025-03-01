import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function createAdminUser() {
  const adminEmail = process.env.ADMINEMAIL
    ? process.env.ADMINEMAIL
    : "example@admin.com";
  const adminPassword = process.env.ADMINPASS
    ? process.env.ADMINPASS
    : "examplePass**123";
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const existingAdmin = await prisma.user.findFirst({
    where: { userRol: "ADMIN" },
  });

  if (!existingAdmin) {
    await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        firstname: "Admin",
        lastname: "User",
        userRol: "ADMIN",
      },
    });
    console.log("✅ Usuario admin creado exitosamente.");
  } else {
    console.log("⚠️ Usuario admin ya existe.");
  }
}

// Ejecutar la función
createAdminUser()
  .catch((error) => console.error("❌ Error creando el admin:", error))
  .finally(() => prisma.$disconnect());
