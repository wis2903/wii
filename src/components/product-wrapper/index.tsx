import React from 'react';
import Button from '../button';
import { useNavigate } from 'react-router-dom';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string,
    id: string,
}

const ProductWrapper = ({ id, className, children }: IProps): JSX.Element => {
    const navigate = useNavigate();

    return (
        <Button className={className} label="" onClick={(): void => {
            navigate(`/product/${id}`);
        }}>
            {children}
        </Button>
    );
};

export default ProductWrapper;