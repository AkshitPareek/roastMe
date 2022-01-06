const main = async () => {
    const pokeContractFactory = await hre.ethers.getContractFactory("pokePortal");
    const pokeContract = await pokeContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.001"),
    });
    
    await pokeContract.deployed();

    console.log("PokePortal Address: ", pokeContract.address);
}


const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  
  runMain();