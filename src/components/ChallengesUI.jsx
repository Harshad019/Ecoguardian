import { useState } from "react";
import { motion } from "framer-motion";

export default function ChallengesUI() {
  const [completed, setCompleted] = useState([]);

  const challenges = [
    {
      id: 1,
      title: "🥗 Reduce Meat Consumption",
      description: "Have at least 2 vegetarian meals this week",
      points: 30,
    },
    {
      id: 2,
      title: "🚲 Choose Greener Transport",
      description: "Use public transport or cycle 3 times instead of a car",
      points: 25,
    },
    {
      id: 3,
      title: "🛒 Buy Local Products",
      description: "Purchase 5 locally produced items this week",
      points: 20,
    },
  ];

  const totalPoints = challenges.reduce((a, c) => a + c.points, 0);
  const earnedPoints = challenges
    .filter((c) => completed.includes(c.id))
    .reduce((a, c) => a + c.points, 0);

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-extrabold text-gray-800">
          🤖 AI Weekly Challenges
        </h3>
        <span className="text-sm bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
          Personalized
        </span>
      </div>

      {/* Progress */}
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>Team Progress</span>
          <span>{earnedPoints} / {totalPoints} pts</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-emerald-500 h-3 rounded-full transition-all"
            style={{ width: `${(earnedPoints / totalPoints) * 100}%` }}
          />
        </div>
      </div>

      {/* Challenges */}
      <div className="space-y-4">
        {challenges.map((ch) => (
          <ChallengeCard
            key={ch.id}
            challenge={ch}
            completed={completed.includes(ch.id)}
            onComplete={() =>
              setCompleted((prev) => [...prev, ch.id])
            }
          />
        ))}
      </div>
    </div>
  );
}

/* -------------------- Card -------------------- */

function ChallengeCard({ challenge, completed, onComplete }) {
  return (
    <motion.div
      layout
      className={`border rounded-2xl p-4 transition ${
        completed
          ? "bg-emerald-50 border-emerald-300"
          : "bg-gray-50 border-gray-200"
      }`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-bold text-gray-800">
            {challenge.title}
          </h4>
          <p className="text-sm text-gray-600 mt-1">
            {challenge.description}
          </p>
        </div>

        <span className="text-sm font-bold text-emerald-700">
          +{challenge.points}
        </span>
      </div>

      {!completed ? (
        <button
          onClick={onComplete}
          className="mt-3 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition"
        >
          Mark Complete
        </button>
      ) : (
        <div className="mt-3 text-sm font-semibold text-emerald-700">
          ✅ Completed
        </div>
      )}
    </motion.div>
  );
}
