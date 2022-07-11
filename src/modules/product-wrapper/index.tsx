import React from 'react';
import Button from '../../components/basic/button';
import EventService from '../../services/event.service';

interface IProps extends React.HTMLAttributes<HTMLButtonElement> {
    className?: string,
    product: IProduct,
}

const ProductWrapper = ({ product, className, children, ...rest }: IProps): JSX.Element => {
    const handleShowProductDetails = (): void => {
        EventService.instance.onRequestShowProductDetails.trigger(product);
    };

    return (
        <Button {...rest} disableClickTransform className={className} label="" onClick={handleShowProductDetails}>
            {children}
        </Button>
    );
};

export default ProductWrapper;