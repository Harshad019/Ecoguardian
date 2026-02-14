import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function TeamManager() {
  const [teamName, setTeamName] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [currentTeam, setCurrentTeam] = useState(null);

  useEffect(() => {
    loadUserTeam();
  }, []);

  const loadUserTeam = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from("Users")
      .select("team_id")
      .eq("id", user.id)
      .single();

    if (data?.team_id) {
      const { data: team } = await supabase
        .from("Teams")
        .select("*")
        .eq("id", data.team_id)
        .single();
      setCurrentTeam(team);
    }
  };

  const createTeam = async () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    const { data: { user } } = await supabase.auth.getUser();

    const { data: team } = await supabase
      .from("Teams")
      .insert([{ name: teamName, invite_code: code }])
      .select()
      .single();

    await supabase.from("Users").update({ team_id: team.id }).eq("id", user.id);
    setCurrentTeam(team);
  };

  const joinTeam = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    const { data: team } = await supabase
      .from("Teams")
      .select("*")
      .eq("invite_code", inviteCode)
      .single();

    if (!team) return alert("Team not found");

    await supabase.from("Users").update({ team_id: team.id }).eq("id", user.id);
    setCurrentTeam(team);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow">
      {!currentTeam ? (
        <>
          <input
            placeholder="Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="border p-2 w-full mb-2"
          />
          <button onClick={createTeam} className="bg-emerald-500 text-white p-2 w-full mb-4">
            Create Team
          </button>

          <input
            placeholder="Invite Code"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
            className="border p-2 w-full mb-2"
          />
          <button onClick={joinTeam} className="bg-teal-500 text-white p-2 w-full">
            Join Team
          </button>
        </>
      ) : (
        <>
          <h3 className="text-xl font-bold">Your Team: {currentTeam.name}</h3>
          <p>Invite Code: {currentTeam.invite_code}</p>
        </>
      )}
    </div>
  );
}

