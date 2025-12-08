// lib/ballot.ts
"use client";

import { ethers } from "ethers";
import ballotArtifact from "@/abi/Ballot.json";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_BALLOT_ADDRESS;

if (!CONTRACT_ADDRESS) {
  console.warn("NEXT_PUBLIC_BALLOT_ADDRESS is not set");
}

export async function getBallotContract() {
  if (typeof window === "undefined") {
    throw new Error("window is not available");
  }

  const anyWindow = window as any;
  const ethereum = anyWindow.ethereum;

  if (!ethereum) {
    throw new Error("MetaMask is not installed");
  }

  // Yêu cầu user connect ví nếu chưa
  const accounts = await ethereum.request({
    method: "eth_requestAccounts",
  });

  if (!accounts || accounts.length === 0) {
    throw new Error("No account found");
  }

  const provider = new ethers.BrowserProvider(ethereum);
  const signer = await provider.getSigner();

  const contract = new ethers.Contract(
    CONTRACT_ADDRESS!,
    (ballotArtifact as any).abi,
    signer
  );

  return { contract, signer, account: await signer.getAddress() };
}
