import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Contact } from 'src/schemas/contact.schema';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.contactsService.findAll(); // Returns all contacts from the database
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() contact: Contact) {
    return this.contactsService.create(contact); // Creates a new contact in the database
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() contact: Partial<Contact>) {
    return this.contactsService.update(id, contact); // Updates an existing contact based on ID
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.contactsService.delete(id); // Deletes a contact based on ID
  }
}
