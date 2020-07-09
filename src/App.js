import React from 'react';
import Cards from './Components/Cards/Cards';
import Chart from './Components/Charts/Chart';
import CountryPicker from './Components/CountryPicker/CountryPicker';
import { fetchData } from './Api';
import './App.css';
import virusImage from './Image/image2.png';

 class App extends React.Component {
   state = {
     data: {},
     country: '',
   }
  
  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({data: fetchedData });
  }

  changeCountry = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({data: fetchedData , country:country });
  }

  render() {

    const { data, country } = this.state;
    return (
      <div className="container">
        <h1 className="imageName">C<img className="Img" src={virusImage} alt="COVID-19"/>VID-19</h1>
      <Cards data = {data}/>
      <CountryPicker changeCountry={this.changeCountry}/>
      <Chart data={data} country={country} />
      
      </div>
    );
  }
}

  

export default App;
