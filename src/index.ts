import App from "./app";
import AuthController from "./controllers/auth.controller";
import TransactionsController from "./controllers/transaction.controller";
import WalletController from "./controllers/wallet.controller";


const app = new App(
  [
    new AuthController(),
    new WalletController(),
    new TransactionsController()
  ]
);

app.listen()