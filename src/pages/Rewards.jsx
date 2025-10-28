import { useState, useEffect } from "react";
import { getRandomReward } from "../api/api";

export default function Rewards() {
  const [reward, setReward] = useState("");

  const fetchReward = async () => {
    const res = await getRandomReward();
    setReward(res.badge);
  };

  useEffect(() => { fetchReward(); }, []);

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-semibold mb-4">Your Eco Rewards</h2>
      <div className="p-6 bg-green-200 rounded-lg text-lg">
        🌟 <strong>{reward}</strong> 🌿
      </div>
      <button onClick={fetchReward} className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
        Get New Reward
      </button>
    </div>
  );
}
