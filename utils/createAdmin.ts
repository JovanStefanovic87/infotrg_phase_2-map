import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const createAdminUser = async () => {
	const hashedPassword = await bcrypt.hash('nekalozinka', 10);
	await prisma.user.create({
		data: {
			email: 'dfgdgdg',
			password: hashedPassword,
			role: 'admin',
		},
	});
};

createAdminUser()
	.then(() => console.log('Admin user created'))
	.catch(error => console.error('Error creating admin user:', error))
	.finally(() => prisma.$disconnect());
