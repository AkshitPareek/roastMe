const main = async () => {

    // const [owner, randomPerson] = await hre.ethers.getSigners();
    /* 
    * Grabbing the wallet address of the owner and a random wallet address
    */

    const pokeContractFactory = await hre.ethers.getContractFactory("pokePortal");
    /*
    * This will actually compile our contract and generate the necessary files 
    * we need to work with our contract under the artifacts directory.
    */

    const pokeContract = await pokeContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.1"), // this will fund the contract from my wallet
        });
    /*
    * Hardhat will create a local Ethereum network for us, but just for this contract. 
    * Then, after the script completes it'll destroy that local network. 
    * So, every time you run the contract, it'll be a fresh blockchain. What's the point? 
    * It's kinda like refreshing your local server every time so you always start from a clean slate
    * which makes it easy to debug errors.
      */
    
    await pokeContract.deployed();
     /*
     * We'll wait until our contract is officially deployed to our local blockchain! 
     * Our constructor runs when we actually deploy.
     */
    
    
    console.log("Contract deployed to:", pokeContract.address);
     /* 
     * pokeContract.address will basically give us the address of the deployed contract. 
     * This address is how we can actually find our contract on the blockchain  
     */

    // console.log("Contract deployed by:", owner.address);


    /*
    * Get Contract balance
    */
    let contractBalance = await hre.ethers.provider.getBalance(
        pokeContract.address
      );
      console.log(
        "Contract balance:",
        hre.ethers.utils.formatEther(contractBalance)
      );  

    /*
    * Manually Calling functions below, as we deployed our contract the functions became
    * available to be called on the blockchain, like a public API endpoint.
    */
    
    // let pokeCount;
    // pokeCount = await pokeContract.getTotalpokes();  //grab the poke
    // console.log(pokeCount.toNumber());

    let pokeTxn = await pokeContract.poke("1 Poke"); // do the poke
    await pokeTxn.wait(); // Wait for the transaction to be mined
    // let pokeTxn2 = await pokeContract.poke("2 Poke"); 
    // await pokeTxn2.wait(); 
    /*
    * Get Contract balance to see what happened!
    */
    contractBalance = await hre.ethers.provider.getBalance(pokeContract.address);
    console.log(
      "Contract balance:",
      hre.ethers.utils.formatEther(contractBalance)
    );

    // const [_, randomPerson] = await hre.ethers.getSigners();

    // pokeCount = await pokeContract.getTotalpokes(); //see if the no. of pokes changed

    // pokeTxn = await pokeContract.connect(randomPerson).poke("Another Poke."); //letting another person hit us a poke
    // await pokeTxn.wait();

    let allPokes = await pokeContract.getAllpokes();
    console.log(allPokes);
    // pokeCount = await pokeContract.getTotalpokes();
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();