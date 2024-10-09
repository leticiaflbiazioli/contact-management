import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact, ContactDocument } from 'src/schemas/contact.schema';

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(Contact.name) private contactModel: Model<ContactDocument>,
  ) {}

  async findAll(): Promise<Contact[]> {
    return this.contactModel.find().exec();  // Retorna todos os contatos do MongoDB
  }

  async create(contact: Contact): Promise<Contact> {
    const newContact = new this.contactModel(contact);
    return newContact.save();  // Salva o novo contato no MongoDB
  }

  async update(id: string, updatedContact: Partial<Contact>): Promise<Contact> {
    return this.contactModel.findByIdAndUpdate(id, updatedContact, {
      new: true,
    }).exec();  // Atualiza o contato existente
  }

  async delete(id: string): Promise<Contact> {
    return this.contactModel.findByIdAndDelete(id).exec();  // Deleta o contato pelo ID
  }

}
