export default function ReceiptResults({ items = [], totalCarbon = 0 }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        🌍 Carbon Footprint Analysis
      </h3>

      {/* Total Carbon */}
      <div className="mb-6">
        <div className="text-4xl font-extrabold text-red-600">
          {Number(totalCarbon).toFixed(2)} kg CO₂
        </div>
        <p className="text-gray-500 text-sm">
          Total emissions from this purchase
        </p>
      </div>

      {/* Item Breakdown */}
      <h4 className="font-semibold text-gray-700 mb-2">
        Item Breakdown
      </h4>

      <div className="space-y-2">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex justify-between border-b pb-2 text-sm"
          >
            <span className="text-gray-700">{item.name}</span>
            <span className="text-gray-500">
              {(item.carbonPerKg * item.quantity).toFixed(2)} kg CO₂
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}