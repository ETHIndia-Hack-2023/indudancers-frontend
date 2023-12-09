import { parseAbi } from "viem";

export const GameContract = {
    abi: parseAbi([
        'function getClaimable(address user) external view returns (uint256)',
        'function claim() external returns (uint256)',
        'function getDanceFloor(address user, uint256 floor_id) external view returns ((uint256,uint256)[9])',
        'function buyDancer(uint256 level) external',
        'function buyFloor() external'
    ]),
}