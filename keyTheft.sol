pragma solidity ^0.5.1;

contract KeyTheft{
    
    address owner;
    bool keyTheftComplete;
    uint p_schnorr;
    uint q_schnorr;
    uint generator;
    uint reward;
    uint yC;
    uint pkV;
    string state;
    
    constructor() public{
        owner = msg.sender;
        p_schnorr = 195931;
        q_schnorr = 311;
        generator = 35074;
        state = "waiting";
    }
    
    modifier checkOwner() { // Modifier
        require(
            msg.sender == owner,
            "Only owner can call this."
        );
        _;
    }
    
    
    function modExp(uint256 _a, uint256 _b, uint256 _m) public returns (uint256 result) {
        if(_b == 0){
            return 1;
        }
        else if(_b == 1){
          return _a%_m;  
        }
        else{
            if(_b%2 == 0){
                uint256 val1 = modExp(_a, _b/2, _m);
                return ((val1%_m)*(val1%_m))%_m;
            }else{
                uint256 val2 = modExp(_a, _b - 1, _m);
                return ((val2%_m)*(_a%_m))%_m;
            }
        }
    }
    
    function changeReward(uint modifiedReward) public checkOwner(){
        reward = modifiedReward;
    }
    
    function initTheft(uint _reward) public {
        state = "init";
        reward = _reward;
        yC = 130018;
        pkV = 183450;
    }

    function claimSecretKey(uint r, uint w, uint commit, uint response) public{
        uint256 trapdoor1 = modExp(generator, w, p_schnorr);
        uint256 trapdoor2 = modExp(yC, r, p_schnorr);
        uint256 trapDoorValue= (trapdoor1%p_schnorr*trapdoor2%p_schnorr)%p_schnorr;
        uint256 challenge = (trapDoorValue%p_schnorr + commit%p_schnorr)%p_schnorr;
        uint256 responseElement = modExp(generator, response, p_schnorr);
        uint256 challengeExponentiation = modExp(pkV, challenge + w, p_schnorr);
        uint256 challengeElement = (commit%p_schnorr*challengeExponentiation%p_schnorr)%p_schnorr;
        require(responseElement == challengeElement);
    }
}