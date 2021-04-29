const { ethers, network } = require("hardhat");
const Collectible = require("../Collectible.json");

const get_breed = (tokenId) => {
    breed = {
        0: "PUG",
        1: "SHIBA_INU",
        2: "ST_BERNARD"
    };
    return breed[tokenId];
};

const create_collectible = async () => {
    const [signer] = await ethers.getSigners();
    const collectible = new ethers.Contract(
        Collectible[network.name].address, Collectible.abi, signer
    );

    const tx = await collectible.createCollectible("none", 12345);
    const receipt = await tx.wait();
    const requestId = receipt.events.filter(e => e.event == "requestedCollectible")[0].args.requestId;
    await new Promise(r => setTimeout(r, 30000));
    const tokenId = await collectible.requestIdToTokenId(requestId);
    const breed = get_breed(await collectible.tokenIdToBreed(tokenId));

    console.log(`Dog breed of tokenId ${tokenId} is ${breed}.`);
};

create_collectible()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
