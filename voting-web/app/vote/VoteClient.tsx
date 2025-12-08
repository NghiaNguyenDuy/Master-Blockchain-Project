"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getBallotContract } from "@/lib/ballot";

type Candidate = {
  index: number;
  name: string;
  votes: number;
};

export default function VoteClient() {
  const { data: session } = useSession();
  const router = useRouter();

  const [account, setAccount] = useState<string>("");
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(false);
  const [winner, setWinner] = useState<string>("");
  const [error, setError] = useState<string>("");

  // form cho chair
  const [newVoter, setNewVoter] = useState<string>("");

  const isChair = session?.user?.role === "CHAIR";

  useEffect(() => {
    if (!session) {
      router.push("/login");
      return;
    }

    // auto connect ví & load dữ liệu khi mở trang
    (async () => {
      try {
        setError("");
        const { contract, account } = await getBallotContract();
        setAccount(account);
        await loadCandidates(contract);
      } catch (e: any) {
        console.error(e);
        setError(e.message || "Failed to connect wallet");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  async function loadCandidates(contractOpt?: any) {
    setLoading(true);
    setError("");
    try {
      const { contract } = contractOpt
        ? { contract: contractOpt }
        : await getBallotContract();

      // ⚠️ Nếu contract của bạn có hàm trả về số lượng candidates, dùng nó
      // Ví dụ: uint public numCandidates;
      // const count = Number(await contract.numCandidates());
      // Ở đây demo cứng 3 ứng viên (Alice, Bob, Charlie) giống CANDIDATES env
      const count = 3;

      const list: Candidate[] = [];
      for (let i = 0; i < count; i++) {
        const c = await contract.candidates(i);
        // assume c = struct { string name; uint voteCount; }
        list.push({
          index: i,
          name: c.name,
          votes: Number(c.voteCount),
        });
      }
      setCandidates(list);
    } catch (e: any) {
      console.error(e);
      setError(e.message || "Failed to load candidates");
    } finally {
      setLoading(false);
    }
  }

  async function handleVote(index: number) {
    setLoading(true);
    setError("");
    try {
      const { contract } = await getBallotContract();
      const tx = await contract.vote(index);
      await tx.wait();
      await loadCandidates(contract);
    } catch (e: any) {
      console.error(e);
      setError(e.reason || e.message || "Vote failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleShowWinner() {
    setLoading(true);
    setError("");
    try {
      const { contract } = await getBallotContract();
      const w = await contract.winningCandidate();
      setWinner(w);
    } catch (e: any) {
      console.error(e);
      setError(e.message || "Failed to get winner");
    } finally {
      setLoading(false);
    }
  }

  // Chỉ dành cho CHAIR: startVote, endVote, giveRightToVote
  async function handleStartVote() {
    setLoading(true);
    setError("");
    try {
      const { contract } = await getBallotContract();
      const tx = await contract.startVote();
      await tx.wait();
    } catch (e: any) {
      console.error(e);
      setError(e.reason || e.message || "startVote failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleEndVote() {
    setLoading(true);
    setError("");
    try {
      const { contract } = await getBallotContract();
      const tx = await contract.endVote();
      await tx.wait();
      await handleShowWinner();
    } catch (e: any) {
      console.error(e);
      setError(e.reason || e.message || "endVote failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleGiveRightToVote(e: React.FormEvent) {
    e.preventDefault();
    if (!newVoter) return;
    setLoading(true);
    setError("");
    try {
      const { contract } = await getBallotContract();
      const tx = await contract.giveRightToVote(newVoter);
      await tx.wait();
      setNewVoter("");
      alert("Granted voting right to " + newVoter);
    } catch (e: any) {
      console.error(e);
      setError(e.reason || e.message || "giveRightToVote failed");
    } finally {
      setLoading(false);
    }
  }

  if (!session) return null;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold mb-2">Voting dApp</h1>

      <div className="border rounded-md p-3 bg-slate-50 text-sm">
        <div>
          Logged in as: <b>{session.user?.email}</b> ({session.user?.role})
        </div>
        <div>Wallet: {account || "Not connected"}</div>
      </div>

      {error && (
        <div className="border border-red-400 bg-red-50 text-red-700 p-2 rounded text-sm">
          {error}
        </div>
      )}

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Candidates</h2>
        {loading && <p className="text-sm text-slate-500">Loading...</p>}

        <div className="space-y-2">
          {candidates.map((c) => (
            <div
              key={c.index}
              className="flex items-center justify-between border rounded px-3 py-2"
            >
              <div>
                <div className="font-semibold">{c.name}</div>
                <div className="text-xs text-slate-500">
                  Votes: {c.votes}
                </div>
              </div>
              <button
                className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                disabled={loading}
                onClick={() => handleVote(c.index)}
              >
                Vote
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <button
          className="px-3 py-1 bg-green-600 text-white rounded text-sm"
          onClick={handleShowWinner}
          disabled={loading}
        >
          Show Winner
        </button>
        {winner && (
          <p className="mt-1">
            Current winner: <b>{winner}</b>
          </p>
        )}
      </section>

      {isChair && (
        <section className="space-y-3 border-t pt-4 mt-4">
          <h2 className="text-lg font-semibold">Chair Controls</h2>

          <div className="flex gap-2">
            <button
              className="px-3 py-1 bg-purple-600 text-white rounded text-sm"
              onClick={handleStartVote}
              disabled={loading}
            >
              Start Vote
            </button>
            <button
              className="px-3 py-1 bg-orange-600 text-white rounded text-sm"
              onClick={handleEndVote}
              disabled={loading}
            >
              End Vote
            </button>
          </div>

          <form
            className="flex flex-col gap-2 max-w-md"
            onSubmit={handleGiveRightToVote}
          >
            <label className="text-sm">
              Grant voting right to address (0x...):
            </label>
            <div className="flex gap-2">
              <input
                className="flex-1 border rounded px-2 py-1 text-sm"
                value={newVoter}
                onChange={(e) => setNewVoter(e.target.value)}
                placeholder="0x..."
              />
              <button
                type="submit"
                className="px-3 py-1 bg-slate-800 text-white rounded text-sm"
                disabled={loading}
              >
                Grant
              </button>
            </div>
          </form>
        </section>
      )}
    </div>
  );
}
