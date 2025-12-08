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

  // Voter 1
  const voter1PasswordHash = await hash("voter123", 10);
  await prisma.user.upsert({
    where: { email: "voter1@voting.local" },
    update: {},
    create: {
      email: "voter1@voting.local",
      name: "Voter 1",
      role: "VOTER",
      hashedPassword: voter1PasswordHash,
    },
  });
  
  // Voter 2
  const voter2PasswordHash = await hash("voter123", 10);
  await prisma.user.upsert({
    where: { email: "voter2@voting.local" },
    update: {},
    create: {
      email: "voter2@voting.local",
      name: "Voter 2",
      role: "VOTER",
      hashedPassword: voter2PasswordHash,
    },
  });
  
  // Voter 3
  const voter3PasswordHash = await hash("voter123", 10);
  await prisma.user.upsert({
    where: { email: "voter3@voting.local" },
    update: {},
    create: {
      email: "voter3@voting.local",
      name: "Voter 3",
      role: "VOTER",
      hashedPassword: voter3PasswordHash,
    },
  });

  // Voter 4
  const voter4PasswordHash = await hash("voter123", 10);
  await prisma.user.upsert({
    where: { email: "voter4@voting.local" },
    update: {},
    create: {
      email: "voter4@voting.local",
      name: "Voter 4",
      role: "VOTER",
      hashedPassword: voter4PasswordHash,
    },
  });

  // Voter 5
  const voter5PasswordHash = await hash("voter123", 10);
  await prisma.user.upsert({
    where: { email: "voter5@voting.local" },
    update: {},
    create: {
      email: "voter5@voting.local",
      name: "Voter 5",
      role: "VOTER",
      hashedPassword: voter5PasswordHash,
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
