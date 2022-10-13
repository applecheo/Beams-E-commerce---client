import { providerRender, screen } from "testUtils";

import Orders from "..";

// jest.mock("axios");

describe("Orders page", () => {
    it("should render order page", () => {
        // (axios.get as jest.Mock).mockResolvedValue({
        //     data: [
        //         {
        //             createdAt: "2022-10-12T05:53:44.859Z",
        //             orderedBy: "634033c6d2ef158434af8cfa",
        //             products: [
        //                 {
        //                     category: "T-shirts",
        //                     createdAt: "2022-10-10T03:39:45.998Z",
        //                     gender: "Men",
        //                     images: [
        //                         "https://images.asos-media.com/products/new-look-tie-dye-bob-marley-t-shirt-in-green/203558596-1-greenpattern",

        //                         "https://images.asos-media.com/products/new-look-tie-dye-bob-marley-t-shirt-in-green/203558596-2",

        //                         "https://images.asos-media.com/products/new-look-tie-dye-bob-marley-t-shirt-in-green/203558596-3",

        //                         "https://images.asos-media.com/products/new-look-tie-dye-bob-marley-t-shirt-in-green/203558596-4",
        //                     ],
        //                     isNewArrival: true,
        //                     isSoldOut: false,
        //                     name: "Marshall Artist siren injection T-shirt in green",
        //                     price: 42,
        //                     size: "S",
        //                     updatedAt: "2022-10-10T03:39:45.998Z",
        //                     __v: 0,
        //                     _id: "63439401f1f4f6889b0d8937",
        //                 },
        //             ],
        //             status: "order received",
        //             updatedAt: "2022-10-12T05:53:44.859Z",
        //             __v: 0,
        //             _id: "63465668e0b3011a2a3f61af",
        //         },
        //     ],
        // });
        providerRender(<Orders />);
        const header = screen.getByRole("heading", { name: "Orders" });
        expect(header).toBeInTheDocument();
    });
});
