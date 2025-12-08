import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import VoteClient from "./VoteClient";

export default async function VotePage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  return <VoteClient />;
}
