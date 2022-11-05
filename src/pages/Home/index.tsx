import { useEffect } from "react";

import ProductCard from "components/ProductCard";
import { MEN_COVER_PICTURE_URL, WOMEN_COVER_PICTURE_URL } from "constants/index";
import { useProductDetails } from "context/ProductDetailsProvider";

const Home = () => {
    const { fetchNewArrival, displayNewArrivalData, prevSlide, nextSlide } = useProductDetails();

    useEffect(() => {
        fetchNewArrival();
    }, []);

    return (
        <div className="mx-96">
            <div
                className=" flex justify-between mt-9 mb-4
            "
            >
                <img
                    src={MEN_COVER_PICTURE_URL}
                    alt="men-cover"
                    className="w-1/2 opacity-90 max-w-3xl mr-2 object-cover max-h-96"
                />
                <img
                    className="w-1/2 opacity-90 max-w-3xl ml-2 object-cover max-h-96"
                    alt="women-cover"
                    src={WOMEN_COVER_PICTURE_URL}
                />
            </div>
            <div>
                <div className="flex justify-between items-center">
                    <h1 className="text-lg my-1 ml-1 font-medium">NEW ARRIVALS</h1>
                    <div className="flex">
                        <button className="mx-1" onClick={prevSlide}>
                            ⇦
                        </button>
                        <button className="mx-1" onClick={nextSlide}>
                            ⇨
                        </button>
                    </div>
                </div>
                <div className="flex ">
                    {displayNewArrivalData?.map((product) => (
                        <ProductCard key={product._id} {...product} />
                    ))}
                </div>
            </div>
            <div>
                <h1 className="text-lg my-2 ml-1 font-medium">CATEGORIES</h1>
                <div className="flex mb-5 justify-between">
                    <div className="w-1/3 max-w-xl mx-1">
                        <img
                            src="https://image-cdn.hypb.st/https%3A%2F%2Fhbx.hypebeast.com%2Ffiles%2F2022%2F09%2FMaison-Kitsune%CC%81-ig-2_unisexcategory.jpg?q=95"
                            alt="shop-by-clothing-cover"
                        />
                        <span className="mr-2 tracking-tighter text-xs">SHOP MEN</span>
                        <span className="mr-2 tracking-tighter text-xs">SHOP WOMEN</span>
                    </div>

                    <div className="w-1/3 max-w-xl mx-1">
                        <img
                            src="https://image-cdn.hypb.st/https%3A%2F%2Fhbx.hypebeast.com%2Ffiles%2F2022%2F09%2FLoewe-Unisex-Page-Sep6.jpg?q=95"
                            alt="shop-by-accessories-cover"
                        />
                        <span className="mr-2 tracking-tighter text-xs">SHOP MEN</span>
                        <span className="mr-2 tracking-tighter text-xs">SHOP WOMEN</span>
                    </div>

                    <div className="w-1/3 max-w-xl mx-1">
                        <img
                            src="https://image-cdn.hypb.st/https%3A%2F%2Fhbx.hypebeast.com%2Ffiles%2F2022%2F09%2Fasicsjjjjound-unisexcategory-shoes.jpg?q=95"
                            alt="shop-by-shoes-cover"
                        />
                        <span className="mr-2 tracking-tighter text-xs">SHOP MEN</span>
                        <span className="mr-2 tracking-tighter text-xs">SHOP WOMEN</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
