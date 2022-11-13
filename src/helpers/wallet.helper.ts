import { Response } from "express";
import knex from "../config/database";


const getWallet = async (response: Response, data: any) => {
  let wallet = await knex("wallets")
    .select({
      wallet_id: "id",
      wallet_number: "wallet_number",
      wallet_balance: "wallet_balance",
    })
    .where(data);

  if (wallet.length == 0) {
    return response
      .status(404)
      .json({ success: false, message: "Wallet not found!" });
  }

  return wallet[0];
};

const initTransaction = async (response: Response, data: any) => {
  try {
    await knex("transactions").insert({
      wallet_id: data.wallet_id,
      transaction_type: data.transaction_type,
      narration: data.narration,
      balance: data.balance
    })

  } catch (error) {
    return response.status(500).json({ success: false, message: "An Error Occurred!" })
  }

}

export { getWallet, initTransaction };
