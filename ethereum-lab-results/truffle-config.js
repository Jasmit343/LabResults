module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Localhost
      port: 8545,        // Ganache default port
      network_id: "*",   // Any network ID
    },
  },
  compilers: {
    solc: {
      version: "0.8.0",  // Solidity compiler version
    },
  },
};

