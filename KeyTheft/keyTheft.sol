pragma solidity ^0.8.10;

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
    
    //Function to allow payment to contract
    receive() external payable { }
    
    //modifier for allowing calling of certainf functions only by owner
    modifier checkOwner() { // Modifier
        require(
            msg.sender == owner,
            "Only owner can call this."
        );
        _;
    }
    
    //Function for fast modular exponentitation
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
    
    //Function allowing owner to modify rewards with time
    function changeReward(uint modifiedReward) public checkOwner(){
        reward = modifiedReward;
    }
    
    //Function fot the owner to init the theft
    function initTheft(uint _reward, uint _yC, uint _pkV) payable checkOwner() public {
        require(msg.value == _reward);
        payable(address(this)).transfer(msg.value);
        state = "init";
        reward = _reward;
        yC = _yC;
        pkV = _pkV;
        
    }
    

    function calculateTrapdoor(uint r, uint w) private returns (uint256){
        //Calculate the parts of the trapdoor function
        uint256 trapdoor1 = modExp(generator, w, p_schnorr);
        uint256 trapdoor2 = modExp(yC, r, p_schnorr);

        //Calculate hashvalue from parts
        uint256 hashValue = uint256(keccak256(abi.encodePacked(trapdoor1, trapdoor2)));
        return hashValue;
    }
    
    function calculateResponseElement(uint generator, uint response) private returns (uint256){
        uint256 responseElement = modExp(generator, response, p_schnorr);
        return responseElement;
    }
    
    function calculateChallengeElement(uint trapDoorValue, uint commit, uint w) private returns (uint256){
        uint256 challenge = (trapDoorValue%p_schnorr + commit%p_schnorr)%p_schnorr;
        uint256 challengeExponentiation = modExp(pkV, challenge + w, p_schnorr);
        uint256 challengeElement = (commit%p_schnorr*challengeExponentiation%p_schnorr)%p_schnorr;
        return challengeElement;
    }

    function claimSecretKey(uint r, uint w, uint commit, uint response) public{
        
        //Check for initialisation of challenge
        require(keccak256(abi.encodePacked(state)) == keccak256(abi.encodePacked("init")));
        //Compute trapdoor value
        uint256 trapDoorValue = calculateTrapdoor(r, w);
        
        //Compute response elemente which is g^reponse
        uint256 responseElement = calculateResponseElement(generator, response);
        
        //Compute challengeElement which is commit*yV^(w + challenge)
        uint256 challengeElement = calculateChallengeElement(trapDoorValue, commit, w);
        
        require(responseElement == challengeElement);
        payable(msg.sender).transfer(reward);
        state = "done";
    }

    //Function to get the current state of the contract
    function getState() public view returns(string memory){
        return state;
    }
}