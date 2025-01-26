const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Full Stack Development" },
        { name: "Mobile Development" },
        { name: "Game Development" },
        { name: "System Design" },
        { name: "Cybersecurity" },
        { name: "Animation and 3D Modelling" },
        { name: "Development Operations" },
        { name: "Graphic Design" },
        { name: "Machine Learning" },
        { name: "Artificial Intelligence" },
      ],
    });
    console.log("Successfully Created");
  } catch (error) {
    console.log("Error in seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}

main();
