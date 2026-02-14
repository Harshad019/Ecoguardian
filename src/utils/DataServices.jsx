import { supabase } from './supabaseClient'
export const saveReceipt = async(userId, imageUrl, items, totalCarbon) => {
    const { data, error } = await supabase
        .from('Receipts')
        .insert([{
            user_id: userId,
            image_url: imageUrl,
            items: JSON.stringify(items), // Convert array to text
            total_carbon: totalCarbon,
            date: new Date().toISOString()
        }])
        .select()
    if (error) {
        console.error('Error saving receipt:', error)
        return null
    }
    return data[ ^ 0]
}
export const updateUserTotalCarbon = async(userId, additionalCarbon) => {
    // Get current total
    const { data: userData } = await supabase
        .from('Users')
        .select('total_carbon')
        .eq('id', userId)
        .single()
    const newTotal = (userData.total_carbon || 0) + additionalCarbon
        // Update user's total
    await supabase
        .from('Users')
        .update({ total_carbon: newTotal })
        .eq('id', userId)
}