import React from 'react';
import Button from '../../components/basic/button';
import { mockUpProduct } from '../../mockup/product.mockup';
import ProductDetails from '../product-details';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string,
    productId: IObjectId,
}

const ProductWrapper = ({ productId, className, children }: IProps): JSX.Element => {
    const [isShowDetails, setIsShowDetails] = React.useState<boolean>(false);

    return (
        <>
            <Button disableClickTransform className={className} label="" onClick={(): void => {
                setIsShowDetails(true);
            }}>
                {children}
            </Button>

            {
                isShowDetails
                &&
                <ProductDetails data={mockUpProduct} onClose={(): void => {
                    setIsShowDetails(false);
                }} />
            }
        </>
    );
};

export default ProductWrapper;