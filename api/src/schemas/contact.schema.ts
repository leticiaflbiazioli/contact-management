import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContactDocument = Contact & Document;

@Schema()
export class Contact {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  sobrenome: string;

  @Prop({ required: true })
  telefone: string;

  @Prop({ required: true })
  dataNascimento: string;

  @Prop({ required: true })
  endereco: string;

  @Prop({ required: true })
  email: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
