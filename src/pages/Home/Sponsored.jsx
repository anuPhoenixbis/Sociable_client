// Sponsored.jsx
const Sponsored = () => {
  const navigate = (url)=>{
    window.open(url,"_blank");
  }
  return (
    <div className="card bg-base-300 w-96 shadow-lg">
      <figure>
        <img
          src="https://images.pexels.com/photos/5008397/pexels-photo-5008397.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt="Kids Bunk Bed" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          Kids Bunk Bed
          <div className="badge badge-secondary">Featured</div>
        </h2>
        <p>Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf.</p>
        <div className="card-actions justify-between">
          <button className="badge badge-soft badge-info hover:bg-info hover:text-black" onClick={()=>navigate("https://anubhavcomfystore.netlify.app/")}>Comfy Store</button>
          <span className="text-xs opacity-70">Sponsored</span>
        </div>
      </div>
    </div>
  );
};

export default Sponsored;
