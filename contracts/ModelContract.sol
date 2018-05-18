pragma solidity ^0.4.11;
/* modelContract - This Model contract governs the transaction for a remote machine learning service.  
*  The three entities which interact with the contract are the buyer, seller, and the external remote services.
*  For a Utility model, we would like this to be like a Pre-Authorized-Debit (PAD), but for now you have to send eth.
* Alpha V1.0 
* May 15, 2018
* Donald Hagell
* Redhio Corporation
*/

contract ModelContract {
    uint public value;
    /* These are roles for this contract.  This is a four (4) entity service agreement with a potential for 
    *  whitelisted operators.  By default he WL is to incude at least the buyer address */
    address public seller;
    address public buyer;
    address public operator;
    address public model;
    address[] public owners;
    uint public required;
    /*
     *  Constants
     */
    uint constant public MAX_OWNER_COUNT = 50;
    /*
     *  Storage
     */
    mapping (address => bool) public isOwner;

    /* These are the contract terms and agreement */
    uint public modelID;  // customer indicates which ML model to run using an ID
    uint public slAccuracy;
    uint public contractSLA;  // stores the min % accuracy the model must produce for contract to be valid, would be sent based on customer account, here we just enter it via web3 app
    uint public contractRate;  // stores the contract rate ($charged to the cust) in wei, would be sent based on customer account, here we just enter it via web3 app
    
    enum State { Created, Locked, Inactive }
    State public state;
    /*
     *  Modifiers
     */
    modifier validRequirement(uint ownerCount, uint _required) {
        require(ownerCount <= MAX_OWNER_COUNT
            && _required <= ownerCount
            && _required != 0
            && ownerCount != 0);
        _;
    }
    /********************************************************************
    * MLspec - These should be in an abstracted class specific to the machine learning model 
	* 		  Specifics inputs and outputs for governing this model
    */
    string public imageName;
    string public prediction;
	
    /* Set the purchase price requirement of the remote machine learning service. */
    function Predict( string _imagename) public payable onlyBuyer {
        require( contractRate  == msg.value); /* Check the funds before we burn any additional gas */
        imageName = _imagename;       
    } 

    /*
     * Public functions
     */
    /// @dev Contract constructor sets initial owners and required number of confirmations.
    /// @param _owners List of initial owners.
    /// @param _required Number of required confirmations.
    function ModelContract(address[] _owners, uint _required)
        public
        validRequirement(_owners.length, _required)
    {
        for (uint i=0; i<_owners.length; i++) {
            require(!isOwner[_owners[i]] && _owners[i] != 0);
            isOwner[_owners[i]] = true;
        }
        owners = _owners;
        required = _required;
    }       	
    /********************************************************************
    * MLaaS - Implementation class specific to the machine learning model 
	* 		  generic inputs and outputs for governing this model
    */
    /* Set the Mocel purchase price and model requirement of the remote machine learning service. Purchase price is hardcoded at 2ether*/
    function MocelRun(uint _modelID, uint _contractRate) public payable {
        require( contractRate  == msg.value); /* Check the funds before we burn any additional gas */
        seller = msg.sender;
        value = msg.value;
        modelID = _modelID;
        contractRate = _contractRate ;
        
    }
    /* Change the Mocel purchase price and model requirement of the remote machine learning service. Purchase price is hardcoded at 2ether*/
    function AlterAgreement(uint _modelID, uint _contractRate) public payable {
        require( contractRate  == msg.value); /* Check the funds before we burn any additional gas */
        seller = msg.sender;
        value = msg.value;
        modelID = _modelID;
        contractRate = _contractRate ;
    }
    

    /* boolean logical function */
    modifier isEqual(bool _condition) {
        require(_condition);
        _;
    }
    /* Check to see the message was sent by the Buyer */
    modifier onlyBuyer() {
        require(msg.sender == buyer);
        _;
    }
    /* Check to see the message was sent by the Seller */
    modifier onlySeller() {
        require(msg.sender == seller);
        _;
    }
    /* Check to see the message was sent by the Owner who is the owner, same as isOwner() */
    modifier onlyOwner() {
        require(msg.sender == seller);
        _;
    }
    /* Check to see the message was sent by the Model */
    modifier onlyModel() {
        require(msg.sender == model);
        _;
    }
    /* Check to see the 'Service Level Acheived is greater or equal to Service Level Agreed' for the machine learning RemoteService */
    modifier isSLA() {
     require(slAccuracy >= contractSLA);
        _;
    }
    /* Check to see the seller is not a liar */
    modifier isLiar() {
        require(slAccuracy < contractSLA);
        _;
    }
    /* Restrict the function to only a certain State.  Useful to step through a sequence of events*/
    modifier inState(State _state) {
        require(state == _state);
        _;
    }
    /* Define all of the contract events here.  One for each state  */
    event Aborted();
    event PurchaseConfirmed(address buyer, address seller, uint amount, uint256 sla);
    event PredictionReceived();

    /* Abort the Mocel purchase and reclaim the ether by the buyer or seller before
    *  the contract is locked for servicing. */
    function abort() public onlySeller inState(State.Created) {
        Aborted(); /* FIRE the Aborted Event */
        state = State.Inactive;
        seller.transfer(this.balance);
    }

    /* Confirm the Mocel purchase contract and the price to further lock the ether until the service is received. confirmReceived()*/
    function confirmPurchase() public inState(State.Created) isEqual(msg.value == (2 * value)) payable {
        PurchaseConfirmed(buyer,seller,value,contractSLA); /* FIRE the PurchaseConfirmed Event */
        buyer = msg.sender;
        slAccuracy +=1;
        state = State.Locked;
    }

    /* Confirm that the buyer has received the prediction, sla and can unlocked the Ether. */
    function confirmReceived() public onlyBuyer isSLA inState(State.Locked)
    {
        if (slAccuracy >= contractSLA){
            PredictionReceived(); /* FIRE the PredictionReceived Event */
         state = State.Inactive; /* Change the state to inactive to complete the final state. */
            /* NOTE: This allows both the buyer and the seller to block the refund - the withdraw pattern should be used. */
            buyer.transfer(value);
            seller.transfer(this.balance);
        }
        else{revert();}
    }
    
    /* Just playing around with a way to destroy the contract to that it is not usable anymore. 
    *  Uses teh sellers address as th owner */
    function ripContract() public onlySeller isLiar {
         selfdestruct(seller);
    }
}
