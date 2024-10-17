"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../../../config";
import ContactsWrapper from "./styles";

interface Contact {
  id: string;
  name: string;
  lastName: string;
  phone: string;
  email: string;
  birthday: string;
}

const Contacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editContactId, setEditContactId] = useState<number | null>(null);

  const fetchContacts = async () => {
    try {
      const authentication = await localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/contacts`, {
        headers: {
          Authorization: `Bearer ${authentication}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      setContacts(response.data);
      fetchContacts();
    } catch (error) {
      // TODO: redirecionar pro login
      console.log(error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const authentication = await localStorage.getItem("token");
      await axios.delete(`${API_URL}/contacts/${id}`, {
        headers: {
          Authorization: `Bearer ${authentication}`,
          "Content-Type": "application/json",
        },
      });
      fetchContacts();
    } catch (error) {
      console.log(error);
    }
  };

  const addContact = () => {
    // setContacts([...contacts, { id: Date.now(), name, email }]);
    // setName("");
    // setEmail("");
  };

  const deleteContact = (id: number) => {
    // setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const editContact = (id: number) => {
    // const contact = contacts.find((contact) => contact.id === id);
    // if (contact) {
    //   setName(contact.name);
    //   setEmail(contact.email);
    //   setEditContactId(id);
    // }
  };

  const updateContact = () => {
    // setContacts(
    //   contacts.map((contact) =>
    //     contact.id === editContactId ? { ...contact, name, email } : contact
    //   )
    // );
    setName("");
    setEmail("");
    setEditContactId(null);
  };

  return (
    <ContactsWrapper>
      <div className="container">
        <div className="header">
          <h1>Contact Management</h1>
          <button className="addButton" onClick={addContact}>
            + Add New Contact
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Birthday</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id}>
                <td>{contact.name}</td>
                <td>{contact.lastName}</td>
                <td>{contact.phone}</td>
                <td>{contact.email}</td>
                <td>{contact.birthday}</td>
                <td className="actions">
                  <button
                    className="editButton"
                    // onClick={() => editContact(contact.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="deleteButton"
                    onClick={() => handleDelete(contact.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ContactsWrapper>
  );
};

export default Contacts;
