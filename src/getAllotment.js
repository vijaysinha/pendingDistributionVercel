export async function getAllotment(shopid = 411001005) {
  const cardwiseAllotment = [];
  const res = await fetch("/.netlify/functions/getAllotment", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ shop_id: shopid }),
  });
  try {
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Function request failed: ${res.status} ${text}`);
    }

    const data = await res.json();

    if (!data || !data.data) throw new Error("Network Problem!");
    formattedAllotment(data);
  } catch (err) {
    console.log(err.message);
  }
  function formattedAllotment(data) {
    const totalCards = data.data.length;
    for (let i = 0; i < totalCards; i++) {
      const rc_allotment = {
        rc_id: data.data[i].rc_id,
        rice:
          (data.data[i]["Rice-4"] || 0) +
          (data.data[i]["CGRice-4"] || 0) +
          (data.data[i]["Rice-5"] || 0) +
          (data.data[i]["CGRice-5"] || 0) +
          (data.data[i]["Rice-6"] || 0) +
          (data.data[i]["CGRice-6"] || 0),
        sugar:
          (data.data[i]["Sugar-4"] || 0) +
          (data.data[i]["Sugar-5"] || 0) +
          (data.data[i]["Sugar-6"] || 0),
        salt:
          (data.data[i]["Salt-4"] || 0) +
          (data.data[i]["Salt-5"] || 0) +
          (data.data[i]["Salt-6"] || 0),
        gram:
          (data.data[i]["Gram-4"] || 0) +
          (data.data[i]["Gram-5"] || 0) +
          (data.data[i]["Gram-6"] || 0),
      };

      cardwiseAllotment.push(rc_allotment);
    }
  }
  return cardwiseAllotment;
}
