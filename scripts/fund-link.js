const { ethers, network } = require("hardhat");
const Link = require("../Link.json");
const Collectible = require("../Collectible.json");

const fund_link = async () => {
    const [signer] = await ethers.getSigners();
    const link_address = Link.networks[network.name].LINK_TOKEN;
    const contract_address = Collectible[network.name].address;
    const amount = "1000000000000000000";

    console.log(`Funding contract at ${contract_address} with 1 LINK on ${network.name} network.`)

    const link_token = new ethers.Contract(
        link_address, Link.abi, signer
    );

    await link_token.transfer(contract_address, amount)
        .then(tx => {
            console.log(`Contract ${contract_address} funded with 1 LINK.`);
            console.log(`Transaction hash: ${tx.hash}`);
        })
};

fund_link()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
