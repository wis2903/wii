import React from 'react';
import Input from '../input';
import SearchIcon from '../../resources/images/search.png';

interface IProps extends Partial<IInputComponentProps> {
    label?: string,
}

const Search = ({ label, ...rest }: IProps): JSX.Element => {
    return (
        <Input {...rest} label={label || 'Search'} icon={SearchIcon} />
    );
};

export default Search;