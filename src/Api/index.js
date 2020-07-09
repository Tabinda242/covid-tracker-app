import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

 export const fetchData = async (country) => {
     let changingURL = url;

     if (country) {
        changingURL = `${url}/countries/${country}`;
     }
    try {
     const { data : { confirmed , recovered, deaths , lastUpdate} } = await axios.get(changingURL);

     return { confirmed, recovered, deaths, lastUpdate };
    }

    catch ( error ) {
    console.log(error);
    }
}

export const dailyData = async () => {
    try {
     const { data } = await axios.get(`${url}/daily`);
     
     const modifyData = data.map((regularData) => ({
         confirmed: regularData.confirmed.total,
         deaths: regularData.deaths.total,
         date: regularData.reportDate,
     }))
     return modifyData;
    }
    
    catch (error) {

    }
}

export const fetchCountries = async () => {
    try {
        const { data: { countries }} = await axios.get(`${url}/countries`);
    
        return countries.map((country) => country.name);
    }
    catch (error) {
        console.log(error);
    }
}
