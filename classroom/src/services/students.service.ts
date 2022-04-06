import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  index() {
    return this.prisma.student.findMany();
  }

  findByAuthUserId(authUserId: string) {
    return this.prisma.student.findUnique({
      where: {
        authUserId,
      },
    });
  }

  findById(id: string) {
    return this.prisma.student.findUnique({
      where: { id },
    });
  }
}
