import { useEffect, useState } from "react";
import getFinalData from "../getFinalData";
import getPortData from "../usePortData";
import PortComponent from "./PortComponent";
function Frame() {
  const [shopId, setShopId] = useState("");
  const [submittedShopId, setSubmittedShopId] = useState(null);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [port_id, setPortId] = useState(null);

  useEffect(() => {
    if (!submittedShopId) {
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await getFinalData(submittedShopId);
        
        setData(result);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [submittedShopId]);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmittedShopId(shopId);
  }

  return (
    <>
      <section className="top w-[90%] h-auto bg-zinc-800 rounded-lg mx-auto mt-3 p-2">
        <h1 className="text-center mt-3 p-2 ">
          छूटे हुए हितग्राही जिनका उठाव शेष है अथवा मूल दुकान से उठाव नही हुआ है
        </h1>
        <div className="shop-details w-full h-auto flex flex-row justify-center items-center gap-3 mt-5 p-2">
          <input
            type="number"
            required
            placeholder="दुकान क्रमांक दर्ज करे..."
            className=" border border-zinc-600 outline-none p-2"
            value={shopId}
            onChange={(e) => setShopId(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </section>

      <section className="frame w-[90%] h-auto bg-zinc-800 rounded-lg mx-auto mt-5 p-4">
        {loading && (
          <p className="text-center font-bold text-2xl">Loading...</p>
        )}
        {error && <p className="text-red-400">{error}</p>}
        {data && (
          <pre className="whitespace-pre-wrap">
            {/* data Table Starts from here */}
            <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
              <table className="hidden md:table w-full text-sm text-center rtl:text-right text-body">
                <thead className="bg-neutral-secondary-soft border-b rounded-base border-default">
                  <tr>
                    <th className="px-2 py-1 md:px-6 md:py-3 font-medium">
                      राशनकार्ड क्र.
                    </th>
                    <th className="px-2 py-1 md:px-6 md:py-3 font-medium">
                      चावल
                    </th>
                    <th className="px-2 py-1 md:px-6 md:py-3 font-medium">
                      शक्कर
                    </th>
                    <th className="px-2 py-1 md:px-6 md:py-3 font-medium">
                      नमक
                    </th>
                    <th className="px-2 py-1 md:px-6 md:py-3 font-medium">
                      चना
                    </th>
                    <th className="px-2 py-1 md:px-6 md:py-3 font-medium">
                      उठाव की स्थिति
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => {
                    
                    return (
                    <tr
                      key={item.rc_id}
                      className="bg-neutral-primary border-b border-default"
                    >
                      <td className="px-2 py-1 md:px-6 md:py-3">
                        {item.rc_id}
                      </td>
                      <td
                        className={`px-2 py-1 md:px-6 md:py-3 ${item.rice > 0 ? "bg-red-400 text-zinc-300" : ""}`}
                      >
                        {item.rice}
                      </td>
                      <td className={`px-2 py-1 md:px-6 md:py-3 ${item.sugar > 0 ? "bg-red-400 text-zinc-300" : ""}`}>
                        {item.sugar}
                      </td>
                      <td className={`px-2 py-1 md:px-6 md:py-3 ${item.salt > 0 ? "bg-red-400 text-zinc-300" : ""}`}>{item.salt}</td>
                      <td className={`px-2 py-1 md:px-6 md:py-3 ${item.gram > 0 ? "bg-red-400 text-zinc-300" : ""}`}>{item.gram}</td>
                      <td className={`px-2 py-1 md:px-6 md:py-3 `}>
                        <PortComponent rc_id={item.rc_id} /> 
                      </td>
                    </tr>
                  )
                }
                  )}
                </tbody>
              </table>
              
              {/* Mobile Card Layout */}
              <div className="md:hidden space-y-4">
                {data.map((item) => (
                  <div
                    key={item.rc_id}
                    className="bg-neutral-primary-soft border border-default rounded-lg p-3 shadow-sm"
                  >
                    <p className="font-bold mb-2">
                      राशनकार्ड क्र.: {item.rc_id}
                    </p>
                    <p>
                      चावल:{" "}
                      <span
                        className={
                          item.rice > 0
                            ? "bg-red-400 text-zinc-300 px-2 rounded"
                            : ""
                        }
                      >
                        {item.rice}
                      </span>
                    </p>
                    <p>शक्कर: <span
                        className={
                          item.sugar > 0
                            ? "bg-red-400 text-zinc-300 px-2 rounded"
                            : ""
                        }
                      >
                        {item.sugar}
                      </span></p>
                    <p>नमक: <span
                        className={
                          item.salt > 0
                            ? "bg-red-400 text-zinc-300 px-2 rounded"
                            : ""
                        }
                      >
                        {item.salt}
                      </span></p>
                    <p>चना: <span
                        className={
                          item.gram > 0
                            ? "bg-red-400 text-zinc-300 px-2 rounded"
                            : ""
                        }
                      >
                        {item.gram}
                      </span></p>
                    <p className="my-2">
                      
                      {item.rice > 0 ? <PortComponent rc_id={item.rc_id} /> : null}
                    
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </pre>
        )}
        <footer className="w-full h-1/3 bg-transparent text-zinc-500">
                <p>@Raigarh</p>
        </footer>
      </section>
    </>
  );
}

export default Frame;
