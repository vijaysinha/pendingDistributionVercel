export async function getAllotment(shopid = 411001005) {
  try {
    const apiResponse = await fetch("/api/getAllotment", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ shop_id: shopid }),
    });

    if (!apiResponse.ok) {
      const text = await apiResponse.text();
      throw new Error(`Function request failed: ${apiResponse.status} ${text}`);
    }

    const data = await apiResponse.json();
    if (!data || !data.data) throw new Error("Network Problem!");

    // Build allotments
    const cardwiseAllotment = data.data.map(item => ({
      rc_id: item.rc_id,
      rice:
        (item["Rice-4"] || 0) +
        (item["CGRice-4"] || 0) +
        (item["Rice-5"] || 0) +
        (item["CGRice-5"] || 0) +
        (item["Rice-6"] || 0) +
        (item["CGRice-6"] || 0),
      sugar:
        (item["Sugar-4"] || 0) +
        (item["Sugar-5"] || 0) +
        (item["Sugar-6"] || 0),
      salt:
        (item["Salt-4"] || 0) +
        (item["Salt-5"] || 0) +
        (item["Salt-6"] || 0),
      gram:
        (item["Gram-4"] || 0) +
        (item["Gram-5"] || 0) +
        (item["Gram-6"] || 0),
    }));

    return cardwiseAllotment;
  } catch (err) {
    console.error(err.message);
    return [];
  }
}
