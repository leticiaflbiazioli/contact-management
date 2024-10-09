import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ContatosModule } from './contacts/contacts.module';
import { ConfigModule } from '@nestjs/config';
import { Contact, ContactSchema } from './schemas/contact.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING), // URL de conexão com o MongoDB
    MongooseModule.forFeature([{ name: Contact.name, schema: ContactSchema }]),
    AuthModule,
    ContatosModule,
  ],
})
export class AppModule {}
