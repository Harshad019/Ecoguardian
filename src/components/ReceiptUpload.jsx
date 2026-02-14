import { useState } from "react";
import { motion } from "framer-motion";

export default function ReceiptUpload() {
  const [stage, setStage] = useState("idle"); 
  // idle | analyzing | result

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 p-4 flex items-center justify-center">
      <div className="w-full max-w-xl">
        {stage === "idle" && <UploadCard onUpload={() => setStage("analyzing")} />}
        {stage === "analyzing" && <AnalyzingCard onDone={() => setStage("result")} />}
        {stage === "result" && <ResultPreview />}
      </div>
    </div>
  );
}

/* -------------------- Upload Card -------------------- */

function UploadCard({ onUpload }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl text-center"
    >
      <h2 className="text-2xl font-extrabold text-emerald-700">
        🧾 Upload Receipt
      </h2>
      <p className="text-gray-600 mt-2">
        Let AI analyze your purchase & carbon footprint
      </p>

      <div className="mt-8 border-2 border-dashed border-emerald-300 rounded-2xl p-8">
        <p className="text-5xl mb-4">📸</p>
        <p className="text-gray-600">
          Drag & drop your receipt here
        </p>
        <p className="text-sm text-gray-400 mt-1">
          or upload a photo / PDF
        </p>
      </div>

      <button
        onClick={onUpload}
        className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold transition"
      >
        Upload & Analyze
      </button>
    </motion.div>
  );
}

/* -------------------- Analyzing State -------------------- */

function AnalyzingCard({ onDone }) {
  // Fake AI delay
  setTimeout(onDone, 2500);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl p-10 shadow-xl text-center"
    >
      <div className="animate-pulse">
        <p className="text-5xl mb-6">🤖</p>
        <h3 className="text-xl font-bold text-emerald-700">
          Analyzing your receipt
        </h3>
        <p className="text-gray-500 mt-2">
          Detecting items · Estimating emissions · Calculating impact
        </p>
      </div>

      <div className="mt-8 w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div className="bg-emerald-500 h-3 w-2/3 animate-pulse"></div>
      </div>
    </motion.div>
  );
}

/* -------------------- Result Preview -------------------- */

function ResultPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Carbon Score */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-3xl p-8 shadow-xl text-center">
        <p className="opacity-90">Estimated Carbon Footprint</p>
        <h2 className="text-5xl font-extrabold mt-2">
          4.82 kg CO₂
        </h2>
        <p className="mt-2 opacity-80">
          🌱 Lower than average purchase
        </p>
      </div>

      {/* Item Breakdown */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          🧺 Item Breakdown
        </h3>

        <BreakdownRow name="Milk (1L)" value="1.2 kg CO₂" />
        <BreakdownRow name="Rice (2kg)" value="2.1 kg CO₂" />
        <BreakdownRow name="Plastic Bag" value="0.4 kg CO₂" />
      </div>

      {/* CTA */}
      <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-bold text-lg transition">
        Save & Earn +40 Eco Points ⭐
      </button>
    </motion.div>
  );
}

function BreakdownRow({ name, value }) {
  return (
    <div className="flex justify-between py-2 border-b last:border-none">
      <span className="text-gray-700">{name}</span>
      <span className="font-semibold text-gray-900">{value}</span>
    </div>
  );
}
