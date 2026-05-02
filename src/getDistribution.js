export async function getDistribution(shop_id) {
  let allMergedData = [];
  const today = new Date();
  const formatted = today.toISOString().split("T")[0];

   // e.g. "2026-04-30"

  try {
    const res = await fetch("/.netlify/functions/getDistribution", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ shop_id: shop_id }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Function request failed: ${res.status} ${text}`);
    }

    const response = await res.json();
    
    if (response.data && response.data.length > 0) {
      const enrichedData = response.data.map((item) => ({
        rc_id: item.existing_rc_number,
        rice: item["commodities"].reduce((acc, item) => {
          if (item.name === "rice" || item.name === "cgrice") {
            return acc + item.qty;
          }
          return acc;
        }, 0),
        sugar: item["commodities"].find((c) => c.name === "sugar")?.qty || 0,
        salt: item["commodities"].find((c) => c.name === "salt")?.qty || 0,
        gram: item["commodities"].find((c) => c.name === "gram")?.qty || 0,
      }));

      allMergedData.push(...enrichedData);
    } else {
      console.warn(`No data found for ID: ${shop_id}`);
    }
  } catch (err) {
    console.error(`Error fetching ID ${shop_id}:`, err);
  }
  const consolidated = Object.values(
    allMergedData.reduce((accu, { rc_id, rice, sugar, salt, gram }) => {
      if (!accu[rc_id]) {
        accu[rc_id] = { rc_id, rice: 0, sugar: 0, salt: 0, gram: 0 };
      }
      accu[rc_id].rice += rice;
      accu[rc_id].sugar += sugar;
      accu[rc_id].salt += salt;
      accu[rc_id].gram += gram;
      return accu;
    }, {}),
  );
 
  

  return consolidated;
}
