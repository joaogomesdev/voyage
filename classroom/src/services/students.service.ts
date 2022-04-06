import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

interface CreateStudentParams {
  authUserId: string;
}

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  index() {
    return this.prisma.student.findMany();
  }

  create({ authUserId }: CreateStudentParams) {
    return this.prisma.student.create({
      data: { authUserId },
    });
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
