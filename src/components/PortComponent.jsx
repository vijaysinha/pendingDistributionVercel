import usePortData from "../usePortData";
function PortComponent({ rc_id }) {
   
    const { error, fps_id, loading } = usePortData(rc_id);
    console.log(fps_id)
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching data</p>;
    return <p className={` ${fps_id ? 'bg-red-400 text-zinc-300 px-2 rounded inline p-2' : 'bg-green-300 text-zinc-900 font-bold px-4 rounded inline p-2'}`}>
        {fps_id ? `${fps_id} से उठाव  ` : 'शायद उठाव शेष'}
    </p>;
}
export default PortComponent;
