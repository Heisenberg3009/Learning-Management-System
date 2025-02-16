import { PrismaClient } from "@prisma/client";

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Music" },
        { name: "Photography" },
        { name: "Fitness" },
        { name: "Accounting" },
        { name: "Filming" },
        { name: "Computer Science" },
        { name: "Engineering" },
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
