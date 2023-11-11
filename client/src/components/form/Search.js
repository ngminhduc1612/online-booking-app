import React, {useState} from "react";
import {DatePicker, Select } from "antd";
import {SearchOutlined } from "@ant-design/icons";
import AlgoliaPlaces from   "algolia-places-react";
import moment from "moment";
import {useHistory} from 'react-router-dom'

//destructure values from ant components
//Phân rã cấu trúc giá trị từ các components

const {RangePikcer} = DatePicker;
const { Options} = Select;




const config = {
    appID: process.env.REACT_APP_ALGOLIA_APP_ID,
    apikey: process.env.REACT_APP_ALGOLIA_APP_KEY,
    language: "en"
};

const Search = () => {
    //state
    const [location, setLocation] = useState('')
    const [date, setDate] = useState('')
    const [bed, setbed] = useState('')  
    //route 
    const history = useHistory(); 



    const handleSubmit = () => {
         history.push('/search-result?location=$(location)${date}&bed=${bed}')
    }; 
  
    return (
        <div className="d-flex pb-4">
          <div className="w-100">
            <AlgoliaPlaces
              placeholder="Location"
              defaultValue={location}
              options={config}
              onChange={({ suggestion }) => setLocation(suggestion.value)}
              style={{ height: "50px"}}
          />
           <RangePikcer 
            onChange={(value,dateString) => setDate(dateString)}
            disableDate={(curent)=> 
                curent && curent.valueOf() < moment().subtract(1, "days")
                     }
          /> 
          </div>
        </div>
      );
      
      
};

export default Search;