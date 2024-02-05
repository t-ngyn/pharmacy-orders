import { Module } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CredentialsResolver } from './credentials.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Credential } from './entities/credential.entity';
import { VendorsModule } from 'src/vendors/vendors.module';

@Module({
  imports: [TypeOrmModule.forFeature([Credential]), VendorsModule],
  providers: [CredentialsResolver, CredentialsService],
  exports: [CredentialsResolver, CredentialsService],
})
export class CredentialsModule {}
