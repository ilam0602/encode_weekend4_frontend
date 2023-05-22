import { useState, useEffect } from "react";
import * as ballotJson from "../assets/TokenizedBallot.json";
import { ethers } from "ethers";

async function fetchWinningProposal() {
  try {
    const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_GOERLI_URL);
    const contractAddress = "0x8581C8307D0F2D79b235c64F87C01C4C7aabb94d";
    const contractABI = ballotJson.abi;
    
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );

    const result = await contract.winningProposal();
    return result.toString();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export default function ReadWinner() {
  const [winningProposal, setWinningProposal] = useState(null);

  useEffect(() => {
    fetchWinningProposal().then((result) => {
      setWinningProposal(result);
    });
  }, []);

  if (winningProposal) {
    return (
      <div>
        <div>Winner: {winningProposal}</div>
      </div>
    );
  } else {
    return (
      <p>Loading data...</p>
    )
  }
}
