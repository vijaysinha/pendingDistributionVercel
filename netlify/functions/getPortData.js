export async function handler(event) {
  try {
    const { rc_id, month = "4", year = "2026" } = JSON.parse(event.body || "{}");

    if (!rc_id) {
      return {
        statusCode: 400,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ error: "rc_id is required" }),
      };
    }

    const res = await fetch("https://epos.cg.gov.in/Epos_Spring/sdms/SRC_Trans_Int", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ month, year, src_no: parseInt(rc_id) }),
    });

    if (!res.ok) {
      const text = await res.text();
      return {
        statusCode: res.status,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ error: `Remote API error: ${res.status} ${text}` }),
      };
    }

    const response = await res.json();
    const portFpsId = response?.benficaryTransList?.[0]?.port_fpsid || null;
    // const memberName = response?.beneficaryMemberList[0]?.member_name_en || null
    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ port_fpsid: portFpsId }),
    };
    


  } catch (err) {
    console.error("Handler error:", err);
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: err.message }),
    };
  }
}

