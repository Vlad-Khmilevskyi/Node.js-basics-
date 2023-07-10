import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const fileContacts = path.resolve("db", "contacts.json")

const updateContacts = movies => fs.writeFile(fileContacts, JSON.stringify(movies, null, 2));

export const listContacts = async() => {
  const data = await fs.readFile(fileContacts);
  return JSON.parse(data);
}


export const getContactById = async(id) => {
  const contacts = await listContacts();
  const result = contacts.find(item => item.id === id);
  return result || null;
}

export const removeContact = async(id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === id);
    if(index === -1){
      return null;
  }

  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
}


export const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContacts = {
    id: nanoid(),
    name,
    email,
    phone,
  }
  contacts.push(newContacts);
  await updateContacts(contacts);
  return newContacts;
}

export default {
  listContacts,
  getContactById,  
  removeContact,
  addContact,
}

