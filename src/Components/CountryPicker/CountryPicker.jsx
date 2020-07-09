import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';
import { fetchCountries } from '../../Api';
import './CountryPicker.css';


const CountryPicker = ({changeCountry}) => {
    const [fetchCountry, setFetchCountry] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
          setFetchCountry(await fetchCountries());
        }

        fetchApi();
    }, [setFetchCountry]);

    return (
        <FormControl className="form">
            <NativeSelect defaultValue="" onChange={(e) => changeCountry((e).target.value)}>
                <option value="">Global</option>
                {fetchCountry.map((country, i) => 
                <option key={i} value={country}>
                  {country}
                </option>)}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker;