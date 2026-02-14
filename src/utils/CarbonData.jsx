import Fuse from "fuse.js";

// Load carbon dataset (JSON or array)
export const loadCarbonData = async() => {
    const response = await fetch("/carbonData.json");
    return response.json();
};

// Match receipt text lines to carbon dataset
export const matchReceiptItems = (extractedText, carbonData) => {
    const lines = extractedText
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 2);

    const fuse = new Fuse(carbonData, {
        keys: ["Product"],
        threshold: 0.4,
    });

    const items = [];

    for (const line of lines) {
        const results = fuse.search(line);

        if (results.length > 0) {
            const match = results[0].item;

            items.push({
                name: line,
                matchedProduct: match.Product,
                carbonPerKg: match.CarbonPerKg,
                quantity: 1, // default quantity
            });
        }
    }

    return items;
};

// Calculate total carbon footprint
export const calculateTotalCarbon = (items) => {
    return items.reduce(
        (total, item) => total + item.carbonPerKg * item.quantity,
        0
    );
};