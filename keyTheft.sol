pragma solidity ^0.4.26;

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
        p_schnorr = 115792089237316195423570985008687907852837564279074904382605163141518161494337;
        q_schnorr = 341948486974166000522343609283189;
        generator = 3141592653589793238462643383279502884197;
        state = "waiting";
    }
    
    modifier checkOwner(address sender) { // Modifier
        require(
            sender == owner,
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
            if(_m%2 == 0){
                uint256 val1 = modExp(_a, _b, _m/2);
                return (val1%_m*val1%_m)%_m;
            }else{
                uint256 val2 = modExp(_a, _b, _m - 1);
                return (val2%_m*_a%_m)%_m;
            }
        }
    }
    
    function changeReward(address sender, uint modifiedReward) public checkOwner(sender){
        reward = modifiedReward;
    }
    
    function initTheft(uint _reward) public checkOwner(msg.sender){
        state = "init";
        reward = _reward;
        yC = 22588096500216114366778444323037111260337010472736012247948748760375405219805;
        pkV = 17841507034478015642014626875826201841314772228626139496904966795667283253352;
    }

    function claimSecretKey(uint r, uint w, uint commit, uint response) public{
        uint256 trapdoor1 = modExp(generator, w, p_schnorr);
        uint256 trapdoor2 = modExp(yC, r, p_schnorr);
        uint256 trapDoorValue= (trapdoor1%p_schnorr*trapdoor2%p_schnorr)%p_schnorr;
        uint256 challenge = uint256(sha256(abi.encodePacked(trapDoorValue, commit)));
        uint256 responseElement = modExp(generator, response, p_schnorr);
        uint256 challengeExponentiation = modExp(pkV, challenge + w, p_schnorr);
        uint256 challengeElement = (commit%p_schnorr*challengeExponentiation%p_schnorr)%p_schnorr;
        require(responseElement == challengeElement);
    }
}