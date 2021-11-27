var keyTheft = artifacts.require("KeyTheft");
var leakageOfSecret = artifacts.require("LeakageOfSecret");

module.exports = function(deployer) {
    deployer.deploy(keyTheft);
    deployer.deploy(leakageOfSecret);
};