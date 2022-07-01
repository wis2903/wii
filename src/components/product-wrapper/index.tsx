import React from 'react';
import Button from '../button';
import { useNavigate } from 'react-router-dom';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string,
    productId: IObjectId,
}

const ProductWrapper = ({ productId, className, children }: IProps): JSX.Element => {
    const navigate = useNavigate();

    return (
        <Button className={className} label="" onClick={(): void => {
            navigate(`/product/${productId}`);
        }}>
            {children}
        </Button>
    );
};

export default ProductWrapper;