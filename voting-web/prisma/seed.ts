import { prisma } from "../lib/prisma";
import { hash } from "bcryptjs";

async function main() {
  const passwordHash = await hash("admin123", 10);

  await prisma.user.upsert({
    where: { email: "chair@voting.local" },
    update: {},
    create: {
      email: "chair@voting.local",
      name: "Chair Person",
      role: "CHAIR",
      hashedPassword: passwordHash,
    },
  });

  console.log("Seed done");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
