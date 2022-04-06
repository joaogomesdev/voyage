import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '../../../database/prisma/prisma.service';
import { AuthorizationGuard } from '../../../http/auth/authorization.guard';
import { Course } from '../models/course';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => String)
  @UseGuards(AuthorizationGuard)
  courses() {
    return '';
  }
}
