export const mockProductData = [
    {
        _id: "6343939ef1f4f6889b0d8930",
        name: "COLLUSION fantasy print T-shirt in black",
        price: 26.9,
        category: "T-shirts",
        gender: "Men",
        images: ["https://images.asos-media.com/products/collusion-fantasy-print-t-shirt-in-black/"],
        size: "S",
        createdAt: "2022-10-10T03:38:06.158Z",
        updatedAt: "2022-10-10T03:38:06.158Z",
        __v: 0,
        isNewArrival: true,
        isSoldOut: false,
    },
];

export const mockUserData = {
    token: "123",
    user: {
        email: "test@email.com",
        firstName: "first name",
        gender: "gender",
        lastName: "last name",
        wishList: [],
        _id: "userid",
    },
};

export const mockOrderData = [
    {
        createdAt: "2022-10-12T05:53:44.859Z",
        orderedBy: "634033c6d2ef158434af8cfa",
        products: [
            {
                category: "T-shirts",
                createdAt: "2022-10-10T03:39:45.998Z",
                gender: "Men",
                images: [
                    "https://images.asos-media.com/products/new-look-tie-dye-bob-marley-t-shirt-in-green/203558596-1-greenpattern",

                    "https://images.asos-media.com/products/new-look-tie-dye-bob-marley-t-shirt-in-green/203558596-2",

                    "https://images.asos-media.com/products/new-look-tie-dye-bob-marley-t-shirt-in-green/203558596-3",

                    "https://images.asos-media.com/products/new-look-tie-dye-bob-marley-t-shirt-in-green/203558596-4",
                ],
                isNewArrival: true,
                isSoldOut: false,
                name: "Marshall Artist siren injection T-shirt in green",
                price: 42,
                size: "S",
                updatedAt: "2022-10-10T03:39:45.998Z",
                __v: 0,
                _id: "63439401f1f4f6889b0d8937",
            },
        ],
        status: "order received",
        updatedAt: "2022-10-12T05:53:44.859Z",
        __v: 0,
        _id: "userid",
    },
];

export const mockWishListData = {
    email: "test@email.com",
    firstName: "first name",
    gender: "gender",
    lastName: "last name",
    wishList: [
        {
            _id: "6343939ef1f4f6889b0d8930",
            name: "COLLUSION fantasy print T-shirt in black",
            price: 26.9,
            category: "T-shirts",
            gender: "Men",
            images: ["https://images.asos-media.com/products/collusion-fantasy-print-t-shirt-in-black/"],
            size: "S",
            createdAt: "2022-10-10T03:38:06.158Z",
            updatedAt: "2022-10-10T03:38:06.158Z",
            __v: 0,
            isNewArrival: true,
            isSoldOut: false,
        },
    ],
    _id: "userid",
};
