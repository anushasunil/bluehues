import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Adarsh",
    lastName: "Balika",
    email: "adarshbalika@gmail.com",
    password: "adarshBalika123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Anusha",
    lastName: "Sunilkumar",
    email: "a@gmail.com",
    password: "a",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];

//  {
// "email": "adarshbalika@gmail.com",
// "password": "adarshBalika123"
// }