import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CoursesService } from '../../services/courses.service';
import { EnrollmentsService } from '../../services/enrollments.service';
import { StudentsService } from '../../services/students.service';

export interface Customer {
  authUserId: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
}

export interface PurchaseCreatedPayload {
  customer: Customer;
  product: Product;
}

@Controller()
export class PurchasesController {
  constructor(
    private studentsService: StudentsService,
    private coursesService: CoursesService,
    private enrollmentsService: EnrollmentsService,
  ) {}
  @EventPattern('purchases.new-purchase')
  async purchaseCreated(@Payload('value') payload: PurchaseCreatedPayload) {
    let student = await this.studentsService.findByAuthUserId(
      payload.customer.authUserId,
    );

    if (!student) {
      student = await this.studentsService.create({
        authUserId: payload.customer.authUserId,
      });
    }

    let course = await this.coursesService.findBySlug(payload.product.slug);

    if (!course) {
      course = await this.coursesService.create({
        title: payload.product.title,
      });
    }

    await this.enrollmentsService.create({
      courseId: course.id,
      studentId: student.id,
    });
  }
}
