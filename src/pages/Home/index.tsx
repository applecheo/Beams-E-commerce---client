import ProductCard from "components/ProductCard";
import { MEN_COVER_PICTURE_URL, WOMEN_COVER_PICTURE_URL } from "constants/index";
import { useProductDetails } from "context/ProductDetailsProvider";

const Home = () => {
    const { newArrivalData } = useProductDetails();
    //use new arrival data

    return (
        <div className="mx-32">
            <div className="mt-4 flex justify-evenly my-2">
                <img
                    src={MEN_COVER_PICTURE_URL}
                    alt="men-cover"
                    className="w-1/2 opacity-90 max-w-lg mr-2"
                    style={{ height: "360px" }}
                />
                <img
                    className="w-1/2 opacity-90 max-w-lg ml-2"
                    alt="women-cover"
                    style={{ height: "360px" }}
                    src={WOMEN_COVER_PICTURE_URL}
                />
            </div>
            <div>
                <h1 className="text-l my-2 ml-1 font-medium">NEW ARRIVALS</h1>
                <div className="flex">
                    {newArrivalData.map((product) => (
                        <ProductCard key={product._id} {...product} />
                    ))}
                </div>
            </div>
            <div>
                <h1 className="text-l my-2 ml-1 font-medium">CATEGORIES</h1>
                <div className="flex mb-5">
                    <div className="w-1/3 max-w-lg mr-2">
                        <img
                            src="https://image-cdn.hypb.st/https%3A%2F%2Fhbx.hypebeast.com%2Ffiles%2F2022%2F09%2FMaison-Kitsune%CC%81-ig-2_unisexcategory.jpg?q=95"
                            alt="shop-by-clothing-cover"
                        />
                        <span style={{ fontSize: "8px" }} className="mr-2 tracking-tighter ">
                            SHOP MEN
                        </span>
                        <span style={{ fontSize: "8px" }} className="mr-2 tracking-tighter ">
                            SHOP WOMEN
                        </span>
                    </div>

                    <div className="w-1/3 max-w-lg mr-2">
                        <img
                            src="https://image-cdn.hypb.st/https%3A%2F%2Fhbx.hypebeast.com%2Ffiles%2F2022%2F09%2FLoewe-Unisex-Page-Sep6.jpg?q=95"
                            alt="shop-by-accessories-cover"
                        />
                        <span style={{ fontSize: "8px" }} className="mr-2 tracking-tighter ">
                            SHOP MEN
                        </span>
                        <span style={{ fontSize: "8px" }} className="mr-2 tracking-tighter ">
                            SHOP WOMEN
                        </span>
                    </div>

                    <div className="w-1/3 max-w-lg mr-2">
                        <img
                            src="https://image-cdn.hypb.st/https%3A%2F%2Fhbx.hypebeast.com%2Ffiles%2F2022%2F09%2Fasicsjjjjound-unisexcategory-shoes.jpg?q=95"
                            alt="shop-by-shoes-cover"
                        />
                        <span style={{ fontSize: "8px" }} className="mr-2 tracking-tighter ">
                            SHOP MEN
                        </span>
                        <span style={{ fontSize: "8px" }} className="mr-2 tracking-tighter ">
                            SHOP WOMEN
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
