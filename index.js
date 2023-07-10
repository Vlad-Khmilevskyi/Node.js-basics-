import listContacts from "./contacts.js";

import { program } from "commander";

const invokeAction = async ({ action, id, name, email, phone  }) => {
  try{
    switch (action) {
      case "list":
        const allContacts = await listContacts.listContacts();
        return console.log(allContacts);
      case "getById":
        const oneContacts = await listContacts.getContactById(id);
        return console.log(oneContacts);
      case "add":
        const newContacts = await listContacts.addContact({name, email, phone});
        return console.log(newContacts);
      case "deleteById":
        const deleteMovie = await listContacts.removeContact(id);
        return console.log(deleteMovie);      
      default:
        console.log("Unknowen action");
    }
  }
  catch (error) {
    console.log(error.message);
  }
}


program
  .option('-a, --action <type>')
  .option('-i, --id <type>')
  .option('-n, --name <type>')
  .option('-e, --email <type>')
  .option('-p, --phone <type>');

program.parse();

const option = program.opts();
invokeAction(option);