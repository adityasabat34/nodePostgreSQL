import bcrypt from "bcryptjs";
import prisma from "../utils/prisma.js";

const seedData = async () => {
  try {
    await prisma.user.deleteMany();

    const hashedPassword = await bcrypt.hash("123456", 10);

    await prisma.user.createMany({
      data: [
        { email: "admin@example.com", password: hashedPassword, isAdmin: true },
        { email: "john@example.com", password: hashedPassword, isAdmin: false },
        { email: "jane@example.com", password: hashedPassword, isAdmin: false },
      ],
    });
    console.log("✅ Dummy users seeded");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

seedData();
