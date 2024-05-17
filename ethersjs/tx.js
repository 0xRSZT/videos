// Importar librería ethers
// import { ethers } from "ethers";
const { ethers, formatEther, parseEther } = require("ethers");

// Conexión a Anvil
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

// Direcciones Públicas
const account1 = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
const account2 = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";

// Clave privada de la cuenta 1
const private1 =
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

// Instanciar wallet
const wallet = new ethers.Wallet(private1, provider);

// Función asíncrona
const main = async () => {
  // Comprobar el balance de la cuenta 1 antes
  const account1BalanceBefore = await provider.getBalance(account1);
  console.log(
    `Account 1 Balance Before: ${formatEther(account1BalanceBefore)} ETH`
  );

  // Comprobar el balance de la cuenta 2 antes
  const account2BalanceBefore = await provider.getBalance(account2);
  console.log(
    `Account 2 Balance Before: ${formatEther(account2BalanceBefore)} ETH`
  );

  // Crear transacción de la cuenta 1 a la cuenta 2
  const tx = await wallet.sendTransaction({
    to: account2,
    value: parseEther("100"),
  });

  // Enviar transacción
  await tx.wait();

  // Ver detalles de la transacción
  console.log(tx);

  // Comprobar el balance de la cuenta 1 después
  const account1BalanceAfter = await provider.getBalance(account1);
  console.log(
    `Account 1 Balance After: ${formatEther(account1BalanceAfter)} ETH`
  );

  // Comprobar el balance de la cuenta 2 después
  const account2BalanceAfter = await provider.getBalance(account2);
  console.log(
    `Account 1 Balance After: ${formatEther(account2BalanceAfter)} ETH`
  );
};

// Llamar a la función principal
main();
