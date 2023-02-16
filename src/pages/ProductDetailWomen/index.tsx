import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { RadioGroup } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { useAuth } from "context/AuthProvider";
import { TDisplayProduct, useProductDetails } from "context/ProductDetailsProvider";
import { useShoppingCart } from "context/ShoppingCartProvider";

const product = {
    description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vel ultrices quam. Cras at arcu sit amet ipsum pulvinar sodales. Praesent sodales sem sed mauris semper, turpis nec ultrices rutrum, mi risus malesuada leo, non accumsan tellus neque ac dolor.",
    highlights: [
        "Aliquant erat valuta.",
        "Fusee an ex sit amer ipsum portal tempore ac",
        "Ipsum porta tempor ac",
        "Suspends sagittal urogram.",
    ],
    details:
        "Nunc diam velit, interdum et lobortis et, sagittis vel massa. Praesent nec porttitor justo. Donec vehicula, libero ac rutrum maximus, tortor erat convallis est, eu ornare purus odio eget orci. Aenean finibus orci non diam aliquet lacinia.",
};
const reviews = { average: Math.ceil(Math.random() * 5 + 2), totalCount: Math.ceil(Math.random() * 100) };

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}
const ProductDetailWomen = () => {
    const { productData, display } = useProductDetails();
    const { updateWishlist } = useAuth();
    const { addToCart } = useShoppingCart();
    const [currentViewing, setCurrentViewing] = useState<TDisplayProduct>({} as TDisplayProduct);
    const { id } = useParams();
    const { userData } = useAuth();

    const displayDetail = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/women/${id}` as string);
        const data = res?.data;
        setCurrentViewing(data);
    };

    useEffect(() => {
        const viewProduct = productData.find((x) => x._id === display);
        if (viewProduct) {
            return setCurrentViewing(viewProduct);
        } else {
            displayDetail();
        }
    }, []);
    return (
        <div className="bg-white">
            <div className=" pt-6 mx-2 xl:mx-72 2xl:mx-96">
                <nav aria-label="Breadcrumb">
                    <ol
                        role="list"
                        className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
                    >
                        <div className="flex items-center">
                            <p className="mr-2 text-sm font-medium text-gray-900">{currentViewing?.gender}</p>
                            <svg
                                width={16}
                                height={20}
                                viewBox="0 0 16 20"
                                fill="currentColor"
                                aria-hidden="true"
                                className="h-5 w-4 text-gray-300"
                            >
                                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                            </svg>
                        </div>

                        <li className="text-sm">
                            <p aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                                {currentViewing?.name}
                            </p>
                        </li>
                    </ol>
                </nav>

                {/* Image gallery */}
                <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-4xl lg:grid-cols-4 lg:gap-x-8 lg:px-8">
                    <div className="aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block">
                        <img
                            src={currentViewing?.images?.[0]}
                            alt={currentViewing?.images?.[0]}
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                    <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                        <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
                            <img
                                src={currentViewing?.images?.[1]}
                                alt={currentViewing?.images?.[1]}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                        <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
                            <img
                                src={currentViewing?.images?.[2]}
                                alt={currentViewing?.images?.[2]}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                    </div>
                    <div className="aspect-w-4 aspect-h-5 sm:overflow-hidden sm:rounded-lg lg:aspect-w-3 lg:aspect-h-4">
                        <img
                            src={currentViewing?.images?.[3]}
                            alt={currentViewing?.images?.[3]}
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                </div>

                {/* Product info */}
                <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            {currentViewing?.name}
                        </h1>
                    </div>

                    {/* Options */}
                    <div className="mt-4 lg:row-span-3 lg:mt-0">
                        <h2 className="sr-only">Product information</h2>
                        <p className="text-3xl tracking-tight text-gray-900">${currentViewing?.price}</p>

                        {/* Reviews */}
                        <div className="mt-6">
                            <h3 className="sr-only">Reviews</h3>
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    {[0, 1, 2, 3, 4].map((rating) => (
                                        <StarIcon
                                            key={rating}
                                            className={classNames(
                                                reviews.average > rating ? "text-gray-900" : "text-gray-200",
                                                "h-5 w-5 flex-shrink-0"
                                            )}
                                            aria-hidden="true"
                                        />
                                    ))}
                                </div>
                                <p className="sr-only">{reviews.average} out of 5 stars</p>
                                <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                    {reviews.totalCount} reviews
                                </p>
                            </div>
                        </div>

                        <div className="mt-10">
                            {/* Sizes */}
                            <div className="mt-10">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                                    <p className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                        Size guide
                                    </p>
                                </div>

                                <RadioGroup value={currentViewing?.size} className="mt-4">
                                    <RadioGroup.Label className="sr-only"> Choose a size </RadioGroup.Label>
                                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-3 lg:grid-cols-3">
                                        {[currentViewing?.size].map((size) => (
                                            <RadioGroup.Option
                                                key={`${size}`}
                                                value={size}
                                                className={({ active }) =>
                                                    classNames(
                                                        size
                                                            ? "bg-white shadow-sm text-gray-900 cursor-pointer text-center"
                                                            : "bg-gray-50 text-gray-200 cursor-not-allowed",
                                                        active ? "ring-2 ring-indigo-500" : "",
                                                        "group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                                                    )
                                                }
                                            >
                                                {({ active, checked }) => (
                                                    <>
                                                        <RadioGroup.Label as="span">{size}</RadioGroup.Label>
                                                        {size ? (
                                                            <span
                                                                className={classNames(
                                                                    active ? "border" : "border-2",
                                                                    checked
                                                                        ? "border-indigo-500"
                                                                        : "border-transparent",
                                                                    "pointer-events-none absolute -inset-px rounded-md"
                                                                )}
                                                                aria-hidden="true"
                                                            />
                                                        ) : (
                                                            <span
                                                                aria-hidden="true"
                                                                className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                                            >
                                                                <svg
                                                                    className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                                                    viewBox="0 0 100 100"
                                                                    preserveAspectRatio="none"
                                                                    stroke="currentColor"
                                                                >
                                                                    <line
                                                                        x1={0}
                                                                        y1={100}
                                                                        x2={100}
                                                                        y2={0}
                                                                        vectorEffect="non-scaling-stroke"
                                                                    />
                                                                </svg>
                                                            </span>
                                                        )}
                                                    </>
                                                )}
                                            </RadioGroup.Option>
                                        ))}
                                    </div>
                                </RadioGroup>
                            </div>
                            {id && (
                                <button
                                    onClick={() => addToCart(id)}
                                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-black py-3 px-8 text-base font-medium text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                                >
                                    Add to bag
                                </button>
                            )}

                            {id && userData?.wishList?.includes(currentViewing?._id) === true ? (
                                <button
                                    onClick={() => updateWishlist(currentViewing?._id)}
                                    className="mt-3 flex w-full items-center justify-center rounded-md border border-transparent bg-black py-3 px-8 text-base font-medium text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                                >
                                    Remove from Wishlist
                                </button>
                            ) : (
                                <button
                                    onClick={() => updateWishlist(currentViewing?._id)}
                                    className="mt-3 flex w-full items-center justify-center rounded-md border border-transparent bg-black py-3 px-8 text-base font-medium text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                                >
                                    Add to Wishlist
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
                        {/* Description and details */}
                        <div>
                            <h3 className="sr-only">Description</h3>

                            <div className="space-y-6">
                                <p className="text-base text-gray-900">{product.description}</p>
                            </div>
                        </div>

                        <div className="mt-10">
                            <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                            <div className="mt-4">
                                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                    {product.highlights.map((highlight) => (
                                        <li key={highlight} className="text-gray-400">
                                            <span className="text-gray-600">{highlight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="mt-10">
                            <h2 className="text-sm font-medium text-gray-900">Details</h2>

                            <div className="mt-4 space-y-6">
                                <p className="text-sm text-gray-600">{product.details}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProductDetailWomen;
