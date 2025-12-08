// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/Voting.sol";

contract DeployVoting is Script {
    // Provide defaults or read from env
    // Set ENV var CANDIDATES="Alice,Bob,Charlie" to override
    function _getCandidates() internal view returns (string[] memory list) {
        string memory raw = vm.envOr("CANDIDATES", string("Alice,Bob"));
        // Split by comma
        bytes memory b = bytes(raw);
        uint count = 1;
        for (uint i = 0; i < b.length; i++) {
            if (b[i] == ",") count++;
        }

        list = new string[](count);
        uint idx = 0;
        uint start = 0;
        for (uint i = 0; i <= b.length; i++) {
            if (i == b.length || b[i] == ",") {
                bytes memory slice = new bytes(i - start);
                for (uint j = start; j < i; j++) {
                    slice[j - start] = b[j];
                }
                list[idx] = string(slice);
                idx++;
                start = i + 1;
            }
        }
    }

    function run() external {
       // Read candidates from env (defaults handled in _getCandidates)
        string[] memory candidates = _getCandidates();

        // Start broadcast using CLI-provided private key
        vm.startBroadcast();
        Ballot ballot = new Ballot(candidates);
        vm.stopBroadcast();

        console2.log("Ballot deployed at:", address(ballot));
    }
}