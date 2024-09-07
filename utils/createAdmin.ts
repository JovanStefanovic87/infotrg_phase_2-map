import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

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

createAdminUser()
	.then(() => console.log('Admin user created'))
	.catch(error => console.error('Error creating admin user:', error))
	.finally(() => prisma.$disconnect());
