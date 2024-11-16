import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const createAdminUser = async () => {
	const hashedPassword = await bcrypt.hash('5NuEiAkC9@)/', 10);
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
	console.log('Admin user created');
};

main()
	.catch(e => {
		console.error(e);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
