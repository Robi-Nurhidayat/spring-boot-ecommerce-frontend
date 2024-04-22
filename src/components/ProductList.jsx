import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/products'; // Ganti dengan URL API yang sesuai

const ProductList = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // empty array means this effect will run only once, equivalent to componentDidMount

  return (
    <div>
      <h1>Data from API</h1>
      
      {
        data && data._embedded.products.map(val => {
            return <div key={val.id}>{val.name}</div>
        })
      }

        <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th scope="col"></th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Unit in Stock</th>
                <th scope="col">Handle</th>
              </tr>
          </thead>
          <tbody>
          {
            data && data._embedded.products.map(val => {
            return (
              <tr key={val.id}>
                <td className='align-middle'>
                  <img src={`${val.imageUrl}`} alt="image" height={50}/>
                </td>
                <td className='align-middle'>{val.name}</td>
                <td className='align-middle'>{val.unitPrice}</td>
                <td className='align-middle'>{val.unitsInStock}</td>
              </tr>
            )
          })
        }
          </tbody>
        </table>
    </div>
  );
};

export default ProductList;
