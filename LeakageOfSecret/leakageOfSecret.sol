pragma solidity ^0.8.10;

contract LeakageOfSecret{
    
    address owner;
    address leaker_address;
    string state;
    uint[] key_hashes;
    uint noEle;
    uint revealedEle;
    uint donationsReceived;
    uint minRequiredDonations;
    uint256 t_end;
    
    receive() external payable { }
    
    //Have count of how much each user has donated
    mapping(address => uint) userDonations;
    
    constructor() public{
        owner = msg.sender;
        
    }
    
    
    //modifier for allowing calling of certainf functions only by owner
    modifier checkOwner() { // Modifier
        require(
            msg.sender == owner,
            "Only owner can call this."
        );
        _;
    }
    
     //modifier for allowing calling of certain functions only by leaker
    modifier checkLeaker() { // Modifier
        require(
            msg.sender == leaker_address,
            "Only leaker can call this."
        );
        _;
    }
    
    function init() public{
        state = "init";
        leaker_address = msg.sender;
    }
    
    function commit(uint256[] memory _keyHashes, uint _noEle, uint _revealedEle, uint _minRequiredDonations, uint256 _t_end) public checkLeaker(){
        
        //Ensure state is correct
        require(keccak256(abi.encodePacked(state)) == keccak256("init"));
        
        state = "commit";
        key_hashes = _keyHashes;
        noEle = _noEle;
        revealedEle = _revealedEle;
        minRequiredDonations = _minRequiredDonations;
        donationsReceived = 0;
        t_end = _t_end;
    }
    function testEncodeing() public{
        uint256 no = 50661;
        uint256 enc = uint(keccak256(abi.encodePacked(no)));
        noEle = enc;
    }
    
    function revealSample(uint[] memory sampleKeys) public checkLeaker(){
        
         //Ensure state is correct
        require(keccak256(abi.encodePacked(state)) == keccak256("commit"));
        
        //Ensure that sample keys are supplied for all the required keys
        require(sampleKeys.length == revealedEle);
        
        //The sample keys are spaced among the keys
        uint ratio = noEle/revealedEle;
        uint i = 0;
        
        for(i = 0;i < sampleKeys.length;i+=ratio){
            require(uint(keccak256(abi.encodePacked(sampleKeys[i]))) == key_hashes[i]);
        }
        
        //Set state
        state = "sampleRevealed";
        
    }
    
    function donate() public payable{
        
       //Ensure state is correct
      require(keccak256(abi.encodePacked(state)) == keccak256("sampleRevealed"));
        
      //Transfer ether to contract
      payable(address(this)).transfer(msg.value);
      
      //Update total received donation
      donationsReceived += msg.value;
    
      if(donationsReceived >= minRequiredDonations){
          state = "readyForReveal";
      }

    }
    
    function revealRemaining(uint[] memory keys)  payable public checkLeaker(){
        //Ensure all keys are supplied
        require(keys.length == noEle);
        
        //Ensure state is correct
        require(keccak256(abi.encodePacked(state)) == keccak256("readyForReveal"));

        for(uint i = 0;i < keys.length;i+=1){
            require(uint(keccak256(abi.encodePacked(keys[i]))) == key_hashes[i]);
        }
        
        //Transfer donations to leaker
        payable(msg.sender).transfer(donationsReceived);
        state = "done";
    }
    
    function withdraw(uint256 _amountToWithdraw) public{
        require(block.timestamp > t_end);
        require(userDonations[msg.sender] > _amountToWithdraw);
        
         //Transfer donations to donator
        bool transfered = payable(msg.sender).send(donationsReceived);
        
        if(transfered){
            userDonations[msg.sender] -= _amountToWithdraw;
        }   
    }

    function getState() public view returns(string memory){
        return state;
    }
}