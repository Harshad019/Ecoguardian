// src/components/Dashboard.jsx

import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";

import ReceiptUpload from "./ReceiptUpload";
import TeamManager from "./TeamManager";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        navigate("/");
      } else {
        setUser(data.user);
      }
    };

    loadUser();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 p-6">

      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-emerald-700">
          🌍 EcoGuardian
        </h1>

        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
        >
          Logout
        </button>
      </header>

      {/* Welcome Section */}
      <section className="bg-white rounded-3xl p-8 shadow-xl mb-8">
        <h2 className="text-2xl font-bold mb-2">Welcome back</h2>
        <p className="text-gray-600">{user.email}</p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Stat title="Carbon This Month" value="128 kg CO₂" />
          <Stat title="Eco Points" value="720 XP" />
          <Stat title="Receipts Tracked" value="18" />
        </div>
      </section>

      {/* Receipt Upload */}
      <div className="mb-8">
        <ReceiptUpload />
      </div>

      {/* Team Manager */}
      <div className="mb-8">
        <TeamManager />
      </div>

    </div>
  );
}

/* ---------- Stat Card ---------- */

function Stat({ title, value }) {
  return (
    <div className="bg-emerald-50 rounded-2xl p-6">
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-3xl font-bold text-emerald-700">{value}</p>
    </div>
  );
}
