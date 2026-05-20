import usePortData from "../usePortData";
function PortComponent({ rc_id }) {
   if (!rc_id) return "संभवतः चावल का उठाव पूरा हो गया।"
    const { error, fps_id, loading } = usePortData(rc_id);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching data</p>;
    return (<p className={` ${fps_id.fps_id ? 'bg-red-400 text-zinc-300 text-sm px-2 rounded inline p-2' : 'bg-green-300  text-zinc-900 font-bold px-4 rounded inline p-2 text-sm'}`}>
        {fps_id.fps_id ? `चावल का ${fps_id.fps_id} से ${fps_id.member_name_en} द्वारा उठाव` : `संभवतः उठाव शेष`	}
    </p>)
}
export default PortComponent;
	
