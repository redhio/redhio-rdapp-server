pragma solidity ^0.4.15;
/* engineContractFactory - This Engine factory contract allows creation of engine contracts.
* Alpha V1.0 
* May 15, 2018
* Donald Hagell
* Redhio Corporation
*/
import "./Factory.sol";
import "./EngineContract.sol";


/// @title engine factory - Allows creation of engine contracts.
contract EngineContractFactory is Factory {

    /*
     * Public functions
     */
    /// @dev Allows verified creation of engine contracts.
    /// @param _owners List of initial owners.
    /// @param _required Number of required confirmations.
    /// @return Returns engine address.
    function create(address[] _owners, uint _required)
        public
        returns (address engine)
    {
        engine = new EngineContract(_owners, _required);
        register(engine);
    }
}
