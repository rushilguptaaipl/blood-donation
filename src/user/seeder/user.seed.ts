import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';


export class SuperAdminUserCreateSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        const data = [
            {
                name: 'SuperAdmin',
                email: 'superadmin@gmail.com',
                password: 'superadmin',
                role: "superadmin",
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now())
            }
        ];
        const saltOrRounds = 10;
        const salt = await bcrypt.genSalt(saltOrRounds);
        for (let i = 0; i < data.length; i++) {
            const userExist = await User.find({ where: { email: data[i].email } });
            const user = new User();
            const passwordHash = await bcrypt.hash(data[i].password, salt);
            if (!userExist.length) {
                user.name = data[i].name;
                user.email = data[i].email;
                user.password = passwordHash;
                user.role = data[i].role
                user.createdAt = data[i].createdAt
                user.updatedAt = data[i].updatedAt
                await User.save(user)
            }










        }
    }
}


