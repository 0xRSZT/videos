// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

// Importar estándar NFT desde OpenZeppelin
import "@openzeppelin/contracts@4.5.0/token/ERC721/ERC721.sol";

// Crear contrato heredando el estándar ERC721
contract PrimerosPasos is ERC721 {
    // Iniciar variable que almacene la dirección del dueño
    address public owner;

    /* Constructor para establecer el nombre y simbolo de
        nuestros NFTs y la dirección del owner al msg.sender */
    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {
        owner = msg.sender;
    }
}
