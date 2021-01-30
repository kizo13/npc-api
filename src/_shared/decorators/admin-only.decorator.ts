import { SetMetadata } from '@nestjs/common';

export const AdminOnly = () => SetMetadata('isAdminOnly', true);
