type TProductCard = {
    name: string;
    gender: string;
    images: string[];
    price: number;
};

const ProductCard = ({ name, images, price }: TProductCard) => {
    return (
        <div className="flex flex-col px-1 items-center ">
            <img src={images[0]} alt={name} className="" />
            <p className="leading-tight " style={{ fontSize: "8px" }}>
                {name}
            </p>
            <p className="text-xs align-bottom ">${price}</p>
        </div>
    );
};
export default ProductCard;
