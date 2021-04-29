const { ethers } = require("hardhat");
const fs = require("fs");

const main = async () => {
    VRF_COORDINATOR="0x8C7382F9D8f56b33781fE506E897a4F1e2d17255"
    LINK_TOKEN="0x326C977E6efc84E512bB9C30f76E30c160eD06FB"
    KEY_HASH="0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4"

    const Collectible = await ethers.getContractFactory("Collectible");
    const collectible = await Collectible.deploy(VRF_COORDINATOR, LINK_TOKEN, KEY_HASH);

    await collectible.deployed();

    console.log(`Collectible deployed at ${collectible.address} on ${network.name} network.`);

    const data = {
        [network.name]: {
            address: collectible.address
        },
        abi: JSON.parse(collectible.interface.format("json"))
    };
    fs.writeFileSync("./Collectible.json", JSON.stringify(data));
};

main()
    .then(() => {
        process.exit(0);
    })
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
