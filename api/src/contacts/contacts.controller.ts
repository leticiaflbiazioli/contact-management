import { Controller, Get, Post, Put, Body, Param, Delete } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Contact } from 'src/schemas/contact.schema';

@Controller('contatos')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.contactsService.findAll();  // Retorna todos os contatos do banco de dados
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() contact: Contact) {
    return this.contactsService.create(contact);  // Cria um novo contato no banco
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() contact: Partial<Contact>) {
    return this.contactsService.update(id, contact);  // Atualiza um contato existente
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.contactsService.delete(id);  // Deleta um contato com base no ID
  }
}
