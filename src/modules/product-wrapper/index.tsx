import React from 'react';
import Button from '../../components/basic/button';
import { mockUpProduct } from '../../mockup/product.mockup';
import EventService from '../../services/event.service';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string,
    productId: IObjectId,
}

const ProductWrapper = ({ productId, className, children }: IProps): JSX.Element => {
    const handleShowProductDetails = (): void => {
        EventService.instance.onRequestShowProductDetails.trigger(mockUpProduct);
    };

    return (
        <Button disableClickTransform className={className} label="" onClick={handleShowProductDetails}>
            {children}
        </Button>
    );
};

export default ProductWrapper;