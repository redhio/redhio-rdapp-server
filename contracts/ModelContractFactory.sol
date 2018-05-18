pragma solidity ^0.4.15;
import "./Factory.sol";
import "./ModelContract.sol";

/* modelContractFactory - This Model factory contract allows creation of model contracts.
* Alpha V1.0 
* May 15, 2018
* Donald Hagell
* Redhio Corporation
*/

/// @title model factory - Allows creation of model contracts.
contract ModelContractFactory is Factory {

    /*
     * Public functions
     */
    /// @dev Allows verified creation of a model contract.
    /// @param _owners List of initial owners.
    /// @param _required Number of required confirmations.
    /// @return Returns model address.
    function create(address[] _owners, uint _required)
        public
        returns (address model)
    {
        model = new ModelContract(_owners, _required);
        register(model);
    }
}
