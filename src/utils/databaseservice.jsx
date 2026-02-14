import { supabase } from "../components/supabaseClient";

export const saveReceipt = async (userId, items, totalCarbon) => {
  const { data, error } = await supabase.from("Receipts").insert([
    {
      user_id: userId,
      items: JSON.stringify(items),
      total_carbon: totalCarbon,
      created_at: new Date(),
    },
  ]);

  if (error) {
    console.error(error);
    return null;
  }

  return data;
};
