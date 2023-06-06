// Setup: npm install @alch/alchemy-sdk
const { Network, Alchemy } = require("alchemy-sdk");

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: "demo", // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);

class AlchemyService {
  async getNftsForStudent(address) {
    const nfts = await alchemy.nft.getNftsForOwner(address, {
      pageSize: 100,
      excludeFilters: [NftFilters.SPAM],
    });

    const formattedNfts = nfts.ownedNfts.map((nft) => {
      const { contract, title, tokenType, tokenId, description, media } = nft;
      console.log(nft.media);
      return {
        contract: contract.address,
        symbol: contract.symbol,
        collectionName: contract.openSea?.collectionName,
        media: media[0]?.gateway
          ? media[0]?.gateway
          : "https://via.placeholder.com/500",
        verified: contract.openSea?.safelistRequestStatus,
        tokenType,
        tokenId,
        title,
        description,
        format: media[0]?.format ? media[0]?.format : "png",
      };
    });

    return formattedNfts;
  }

    async getNftsForContract(address) {
    const nfts = await alchemy.nft.getNftsForContract(address, {
      pageSize: 100,
      excludeFilters: [NftFilters.SPAM],
    });

    const formattedNfts = nfts.ownedNfts.map((nft) => {
        const { contract, title, tokenType, tokenId, description, media } = nft;
        console.log(nft.media);
        return {
            contract: contract.address,
            symbol: contract.symbol,
            collectionName: contract.openSea?.collectionName,
            media: media[0]?.gateway
            ? media[0]?.gateway
            : "https://via.placeholder.com/500",
            verified: contract.openSea?.safelistRequestStatus,
            tokenType,
            tokenId,
            title,
            description,
            format: media[0]?.format ? media[0]?.format : "png",
        };
        });

        return formattedNfts;
    }

}

export default new AlchemyService();
