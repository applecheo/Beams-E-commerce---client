const men_cover_picture =
  "https://images.unsplash.com/photo-1554924821-06226b7202e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c3RyZWV0JTIwZmFzaGlvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60";
const women_cover_picture =
  "https://d2line.com/thatlook/wp-content/uploads/sites/4/2022/02/sneakers-streetwear-clothing-fashion-d2line-1-1024x683.png";

const Home = () => {
  return (
    <div className="mx-32">
      <div className="mt-4 flex justify-evenly">
        <img
          src={men_cover_picture}
          alt="men-cover"
          className="w-1/2 opacity-90 max-w-lg mr-2"
          style={{ height: "360px" }}
        />
        <img
          className="w-1/2 opacity-90 max-w-lg ml-2"
          alt="women-cover"
          style={{ height: "360px" }}
          src={women_cover_picture}
        />
      </div>
    </div>
  );
};

export default Home;
