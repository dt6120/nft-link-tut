const { ethers, network } = require("hardhat");
const fs = require("fs");
const Collectible = require("../Collectible.json");

const metadata_template = {
    "name": "",
    "description": "",
    "image": "",
    "attributes": [
        {
            "trait_type": "cuteness",
            "value": 100
        }
    ]
}

const get_breed = (tokenId) => {
    breed = {
        0: "PUG",
        1: "SHIBA_INU",
        2: "ST_BERNARD"
    };
    return breed[tokenId];
};

const create_metadata = async () => {
    const [signer] = await ethers.getSigners();
    const collectible = new ethers.Contract(Collectible.matic.address, Collectible.abi, signer);
    const number_of_tokens = await collectible.tokenCounter();
    console.log(`Number of tokens deployed: ${number_of_tokens}`);

    for (let token_id = 0; token_id < number_of_tokens; token_id++) {
        const collectible_metadata = metadata_template;
        const breed = get_breed(await collectible.tokenIdToBreed(token_id));
        metadata_filename = `../metadata/${network.name}/${token_id}-${breed}.json`;
        
        try {
            await fs.access(metadata_filename);
            console.log(`${metadata_filename} already found.`);
        } catch {
            console.log(`Creating metadata file ${metadata_filename}`);
            collectible_metadata.name = breed;
            collectible_metadata.description = `An adorable ${collectible_metadata.name} pup`;
        }
    }
};

create_metadata()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
