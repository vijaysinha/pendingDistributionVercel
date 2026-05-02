export async function handler(event) {
  const { shop_id } = JSON.parse(event.body || "{}");

  if (!shop_id) {
    return {
      statusCode: 400,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: "shop_id is required" }),
    };
  }

  try {
    const res = await fetch(
      "https://epos.cg.gov.in/Epos_Spring/KeyRegister/getfpsKeyRegisterCardsList",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          month: "4",
          year: "2026",
          dist_code: "386",
          afso_code: "4048",
          fps_id: shop_id,
        }),
      },
    );

    if (!res.ok) {
      const text = await res.text();
      return {
        statusCode: res.status,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ error: `Remote API error: ${res.status} ${text}` }),
      };
    }

    const data = await res.json();

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: err.message }),
    };
  }
}
