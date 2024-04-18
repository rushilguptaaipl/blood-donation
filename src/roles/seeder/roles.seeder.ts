import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Roles } from '../entities/roles.entity';
import * as bcrypt from 'bcrypt';

export class RolesCreateSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const data = [
      {
        name: 'superadmin',
        is_super_admin: true,
        permissions: null,
      },
    ];

    for (let i = 0; i < data.length; i++) {
      const isRoleExists = await Roles.findOne({
        where: { name: data[i].name },
      });
      const role = new Roles();
      if (!isRoleExists) {
        role.name = data[i].name;
        role.is_super_admin = data[i].is_super_admin;
        role.permissions = data[i].permissions;
        await Roles.save(role);
      } else {
        isRoleExists.name = data[i].name;
        isRoleExists.is_super_admin = data[i].is_super_admin;
        isRoleExists.permissions = data[i].permissions;
        await connection
          .createQueryBuilder()
          .update(Roles)
          .set(isRoleExists)
          .where('id = :id', { id: isRoleExists.id })
          .execute();
      }
    }
  }
}
