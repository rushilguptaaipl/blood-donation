import { Injectable } from '@nestjs/common';
import { FindAdminDto } from './dto/find-admin.dto';


@Injectable()
export class AdminService {
  create(createAdminDto: FindAdminDto) {
    return 'This action adds a new admin';
  }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
