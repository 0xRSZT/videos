async function main() {
  const Pixels = await ethers.getContractFactory("Pixels");

  const pixels = await Pixels.deploy();
  console.log("Contract deployed to address:", pixels.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
