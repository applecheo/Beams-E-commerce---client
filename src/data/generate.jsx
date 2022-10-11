import { useState } from "react";

import axios from "axios";
const url = "http://localhost:3000/seed";

const Generate = () => {
    const [data, setData] = useState({});
    const fetchDetail = () => {
        const options = {
            method: "GET",
            url: "https://asos2.p.rapidapi.com/products/v3/detail",
            params: {
                //change id
                id: "203817310",
                lang: "en-US",
                store: "US",
                sizeSchema: "US",
                currency: "USD",
            },
            headers: {
                "X-RapidAPI-Key": "747860ed2amsh5e2b657f7bc39edp192e87jsnbed38fb46d57",
                "X-RapidAPI-Host": "asos2.p.rapidapi.com",
            },
        };

        axios
            .request(options)
            .then(function (response) {
                console.log(response.data);
                console.log(response.data.media.images?.[0]?.url);
                setData(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const detail = {
        name: data?.name,
        images: [
            `https://${data?.media?.images?.[0]?.url}`,
            `https://${data?.media?.images?.[1]?.url}`,
            `https://${data?.media?.images?.[2]?.url}`,
            `https://${data?.media?.images?.[3]?.url}`,
        ],
        price: data?.price?.current?.value,
        gender: data?.gender,
        category: data?.productType?.name,
        size: "M",
        isNewArrival: false,
    };
    const add = (values) => async () => {
        try {
            await axios.post(url, values, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
        } catch (error) {
            console.log("Email already in use");
        }
    };
    return (
        <>
            <button className="bg-green-600 " onClick={fetchDetail}>
                fetch
            </button>
            <button className="bg-blue-600" onClick={add(detail)}>
                Add
            </button>
        </>
    );
};
export default Generate;
