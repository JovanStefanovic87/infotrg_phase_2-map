import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const createAdminUser = async () => {
	const hashedPassword = await bcrypt.hash('nekaliznkaka', 10);
	await prisma.user.create({
		data: {
			email: 'suinfotrg@gmail.com',
			password: hashedPassword,
			role: 'admin',
		},
	});
};

const main = async () => {
	await createAdminUser();
};

main()
	.catch(e => {
		console.error(e);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
