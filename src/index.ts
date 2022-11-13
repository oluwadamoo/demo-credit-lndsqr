import App from "./app";
import AuthController from "./controllers/auth.controller";
import WalletController from "./controllers/wallet.controller";


const app = new App(
  [
    new AuthController(),
    new WalletController()
  ]
);

app.listen()