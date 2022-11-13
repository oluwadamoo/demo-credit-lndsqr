import { Response } from "express";
import knex from "../config/database";
import { getWallet } from "./wallet.helper";

const getUser = async (response: Response, data: any) => {
  let user = await knex("users")
    .select({
      id: "id",
      first_name: "first_name",
      last_name: "first_name",
      email: "email",
      profile_picture: "profile_picture",
      password: "password",
    })
    .where(data)
    .timeout(1000);

  if (user.length == 0) {
    return response
      .status(404)
      .json({ success: false, message: "User not found!" });
  }

  let wallet = await getWallet(response, { user_id: user[0].id });

  return { ...user[0], ...wallet };
};

export { getUser };
