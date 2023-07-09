import listContacts from "./contacts.js";

import { program } from "commander";

const invokeAction = async ({ action, id, title, director  }) => {
  try{
    switch (action) {
      case "list":
        const allContacts = await listContacts.listContacts();
        return console.log(allContacts);
      case "getById":
        const oneContacts = await listContacts.getContactById(id);
        return console.log(oneContacts);
      case "deleteById":
        const deleteMovie = await listContacts.removeContact(id);
        return console.log(deleteMovie);
      case "add":
        const newContacts = await listContacts.addContact({title, director});
        return console.log(newContacts);
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
  .option('-t, --title <type>')
  .option('-d, --director <type>');

program.parse();

const option = program.opts();
invokeAction(option);