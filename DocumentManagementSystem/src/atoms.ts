 import { atom } from "recoil";

 export const customerContacs = atom({
     key:"contacs",
     default:[
        { name: "John Doe", address: "123 Elm St", phone: "123-456-7890" },
        { name: "Jane Smith", address: "456 Oak Ave", phone: "987-654-3210" },
        { name: "Michael Johnson", address: "789 Pine Rd", phone: "555-123-4567" },
        { name: "Emily Davis", address: "321 Maple Dr", phone: "111-222-3333" },
  ]
 }) 
