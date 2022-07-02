import React from 'react';
import Button from '../../button';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string,
    productId: IObjectId,
}

const ProductWrapper = ({ productId, className, children }: IProps): JSX.Element => {
    return (
        <Button className={className} label="" onClick={(): void => {
            //
        }}>
            {children}
        </Button>
    );
};

export default ProductWrapper;