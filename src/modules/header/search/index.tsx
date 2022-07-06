import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../../components/basic/input';
import SearchIcon from '../../../resources/images/search.png';

interface IProps extends Partial<IInputComponentProps> {
    label?: string,
}

const Search = ({ label, ...rest }: IProps): JSX.Element => {
    const navigate = useNavigate();
    const params = useParams();
    const [keyword, setKeyword] = React.useState<string>(params.keyword || '');
    const ref = React.useRef<HTMLInputElement>(null);

    const handleSearch = (): void => {
        if (keyword) navigate(`/search/${keyword}`);
        if (ref.current) ref.current.blur();
    };

    return (
        <Input
            {...rest}
            inputRef={ref}
            initValue={params.keyword}
            label={label || 'Search'}
            icon={{
                type: 'image',
                value: SearchIcon,
                onClick: handleSearch,
            }}
            onValueChange={(value): void => {
                setKeyword(value);
            }}
            onEnter={handleSearch}
        />
    );
};

export default Search;