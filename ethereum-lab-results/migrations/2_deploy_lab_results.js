const LabResults = artifacts.require("LabResults");

module.exports = function (deployer) {
  deployer.deploy(LabResults);
};

