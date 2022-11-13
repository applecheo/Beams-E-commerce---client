import { useEffect, useState } from "react";

import axios from "axios";
import ProductCard from "components/ProductCard";
import { MEN_COVER_PICTURE_URL, WOMEN_COVER_PICTURE_URL } from "constants/index";
import { TDisplayProduct } from "context/ProductDetailsProvider";

const Home = () => {
    const [newArrivalData, setNewArrivalData] = useState<TDisplayProduct[]>([]);
    const [displayNewArrivalData, setDisplayNewArrivalData] = useState<TDisplayProduct[]>([]);
    let position;

    const first_page_element = newArrivalData.slice(0, 5);
    const first_element_of_first_page = first_page_element?.[0]?._id;
    const second_page_element = newArrivalData.slice(5, 10);
    const second_element_of_second_page = second_page_element?.[0]?._id;
    const third_page_element = newArrivalData.slice(10, 15);

    const fetchNewArrival = async () => {
        const res = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/home` as string);
        const data = res?.data;
        const filterNewArrival = data.filter((product: { isNewArrival: boolean }) => product?.isNewArrival === true);
        setNewArrivalData(filterNewArrival);
        const first5 = filterNewArrival.slice(0, 5);
        setDisplayNewArrivalData(first5);
    };

    const nextSlide = () => {
        if (displayNewArrivalData.filter((x) => x._id === first_element_of_first_page).length === 1) {
            position = 0;
        } else if (displayNewArrivalData.filter((x) => x._id === second_element_of_second_page).length === 1) {
            position = 1;
        } else {
            position = 2;
        }
        switch (position) {
            case 0:
                setDisplayNewArrivalData(second_page_element);
                break;
            case 1:
                setDisplayNewArrivalData(third_page_element);
                break;
            case 2:
                setDisplayNewArrivalData(first_page_element);
                break;
            default:
                setDisplayNewArrivalData(first_page_element);
        }
    };

    const prevSlide = () => {
        if (displayNewArrivalData.filter((x) => x._id === first_element_of_first_page).length === 1) {
            position = 0;
        } else if (displayNewArrivalData.filter((x) => x._id === second_element_of_second_page).length === 1) {
            position = 1;
        } else {
            position = 2;
        }
        switch (position) {
            case 0:
                setDisplayNewArrivalData(third_page_element);
                break;
            case 1:
                setDisplayNewArrivalData(first_page_element);
                break;
            case 2:
                setDisplayNewArrivalData(second_page_element);
                break;
            default:
                setDisplayNewArrivalData(first_page_element);
        }
    };

    useEffect(() => {
        fetchNewArrival();
    }, []);

    return (
        <div className="sm: flex justify-center flex-col mx-2 lg:mt-4 xl:mx-72 2xl:mx-96 ">
            <div className=" flex justify-between mt-2 mb-1">
                <img
                    src={MEN_COVER_PICTURE_URL}
                    alt="men-cover"
                    className="w-1/2 opacity-90 max-w-3xl mr-1 object-cover max-h-48 md:max-h-60 lg:max-h-80 xl:max-h-64 2xl:max-h-96"
                />
                <img
                    className="w-1/2 opacity-90 max-w-3xl ml-1 object-cover max-h-48 md:max-h-60 lg:max-h-80 xl:max-h-64 2xl:max-h-96"
                    alt="women-cover"
                    src={WOMEN_COVER_PICTURE_URL}
                />
            </div>
            <div>
                <div className="flex justify-between items-center">
                    <h1 className="text-lg my-1 ml-1 font-medium">NEW ARRIVALS</h1>
                    <div className="flex">
                        <button className="mx-1" onClick={prevSlide} data-testid="prev-arrow-button">
                            ⇦
                        </button>
                        <button className="mx-1" onClick={nextSlide} data-testid="next-arrow-button">
                            ⇨
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-3 md:grid-cols-5">
                    {displayNewArrivalData?.map((product) => (
                        <ProductCard key={product._id} {...product} />
                    ))}
                </div>
            </div>
            <div>
                <h1 className="text-lg my-2 ml-1 font-medium">CATEGORIES</h1>
                <div className="flex mb-5 justify-between">
                    <div className="w-1/3 max-w-sm mx-1">
                        <img
                            src="https://image-cdn.hypb.st/https%3A%2F%2Fhbx.hypebeast.com%2Ffiles%2F2022%2F09%2FMaison-Kitsune%CC%81-ig-2_unisexcategory.jpg?q=95"
                            alt="shop-by-clothing-cover"
                        />
                        <div className="flex flex-col items-center md:flex-row">
                            <span className="mr-2 tracking-tighter text-xs">SHOP MEN</span>
                            <span className="mr-2 tracking-tighter text-xs">SHOP WOMEN</span>
                        </div>
                    </div>

                    <div className="w-1/3 max-w-sm mx-1">
                        <img
                            src="https://image-cdn.hypb.st/https%3A%2F%2Fhbx.hypebeast.com%2Ffiles%2F2022%2F09%2FLoewe-Unisex-Page-Sep6.jpg?q=95"
                            alt="shop-by-accessories-cover"
                        />
                        <div className="flex flex-col items-center md:flex-row">
                            <span className="mr-2 tracking-tighter text-xs">SHOP MEN</span>
                            <span className="mr-2 tracking-tighter text-xs">SHOP WOMEN</span>
                        </div>
                    </div>

                    <div className="w-1/3 max-w-sm mx-1">
                        <img
                            src="https://image-cdn.hypb.st/https%3A%2F%2Fhbx.hypebeast.com%2Ffiles%2F2022%2F09%2Fasicsjjjjound-unisexcategory-shoes.jpg?q=95"
                            alt="shop-by-shoes-cover"
                        />
                        <div className="flex flex-col items-center md:flex-row">
                            <span className="mr-2 tracking-tighter text-xs">SHOP MEN</span>
                            <span className="mr-2 tracking-tighter text-xs">SHOP WOMEN</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
