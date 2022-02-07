import React, { useEffect } from 'react';

import Select from 'react-select';

import axios from 'axios';

import './outside.css'

import { useState } from 'react';



let mydata = new Set();





const options = [

  {

    label: "react",

    value: "react"

  },

  {

    label: "hello",

    value: "hello"

  },

  {

    label: "sunny",

    value: "sunny"

  },

  {

    label: "rainy",

    value: "rainy"

  },

  {

    label: "buckle",

    value: "buckle"

  }

]




const customStyles = {



  singleValue: (base) => ({

    ...base,

    color: 'white',

  }),



  control: (base, state) => ({

    ...base,

    background: '#383737',

    borderRadius: "5px",

    color: state.isSelected ? "white" : "white",

    borderColor: state.isFocused ? "black" : "black",

    // Removes weird border around container

    boxShadow: state.isFocused ? null : null,

    "&:hover": {

      // Overwrittes the different states of border

      borderColor: state.isFocused ? "black" : "black"

    }

  }),

  menu: (base, state) => ({

    ...base,

    borderRadius: 5,

    marginTop: 0,

  }),

  menuList: (base, state) => ({

    ...base,

    padding: 0,

    borderRadius: 5,

    color: "white",

    width: 190

  }),

  dropdownIndicator: (base, state) => ({

    ...base,

    color: state.isSelected ? 'white' : '#a8a6a6',

    '&:hover': { color: 'white' }

  }),



  option: (base, state) => ({

    ...base,



    color: state.isSelected ? '#f8f8f8' : 'white',

    padding: 10,

    backgroundColor: state.isSelected ? '#a8a6a6' : '#484848',

    '&:hover': { backgroundColor: 'white', color: '#000000' }

  })

};




const Optionselect = () => {



  let [responseData, setResponseData] = useState('');

  let [brand, setbrand] = useState([]);

  let [state, setState] = useState(() => new Set());

  let [unique, setunique] = useState([])





  const traverse = () => {

    for (const k in state) {

      console.log(k, "pop");

    }

  }

  const addItem = item => {

    setState(prev => new Set(prev).add(item));

  }

  async function getData()
  {
    const data = await axios({

      "method": "GET",

      "url": "https://assessment-edvora.herokuapp.com/"

    })

      .then((response) => {

        // console.log(response)

        setResponseData(response.data);

        setbrand(response.data);

        response.data.map((data) => {

          addItem(data.brand_name);

        })

        for (const i in state) {

          console.log(i);

        }

        traverse();

      })

      .catch((error) => {

        console.log(error)

      })
    console.log(state, "MeState1")
  }



  useEffect(() => {

    getData()

  }, [])



  console.log(state, brand);

  // console.log(state.size);






  return <div className='outside'>

    <p>Filters</p>

    <div className='line'></div>

    <div className='box'>

      <Select placeholder='Products' styles={customStyles} className='selectitems' options={unique} />

      <Select placeholder='State' styles={customStyles} className='selectitems' options={options} />

      <Select placeholder='City' styles={customStyles} className='selectitems' options={options} />

    </div>

  </div>;

};



export default Optionselect;