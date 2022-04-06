import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { CustomersService } from '../../../services/customers.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { AuthUser, CurrentUser } from '../../auth/current-user';
import { Customer } from '../models/customer';

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(private customerService: CustomersService) {}

  @UseGuards(AuthorizationGuard)
  @Query(() => Customer)
  me(@CurrentUser() user: AuthUser) {
    return this.customerService.findByAuthUserId(user.sub);
  }
}
