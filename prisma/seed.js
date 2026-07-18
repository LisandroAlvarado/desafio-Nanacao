import prisma from "../src/config/prisma.js";

async function main() {
  await prisma.cafe.deleteMany();

  await prisma.cafe.createMany({
    data: [
      {
        nombre: "Espresso",
      },
      {
        nombre: "Latte",
      },
      {
        nombre: "Capuccino",
      },
      {
        nombre: "Mocaccino",
      },
    ],
  });

  console.log("Seed ejecutado correctamente");
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
