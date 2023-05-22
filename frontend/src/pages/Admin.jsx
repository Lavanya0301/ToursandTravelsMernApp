import React, { useState, useEffect } from 'react';
import { Form, Col, Container, FormGroup } from 'reactstrap';
import '../styles/admin.css';
import useFetch from '../hooks/useFetch';
import { BASE_URL } from "../utils/config";

//import { v2 as cloudinary } from "cloudinary";




function Admin() {


  const [showAddTourDetails, setShowAddTourDetails] = useState(false);

  const [showDeleteTourDetails, setShowDeleteTourDetails] = useState(false);


  const handleAddTourButtonClick = () => {
    setShowAddTourDetails(true);
    setShowDeleteTourDetails(false);
  };

  const handleDeleteTourButtonClick = () => {
    setShowDeleteTourDetails(true);
    setShowAddTourDetails(false);

  };



  return (
    <Container>
      <Col>
        <div>
          <h1>Tour Details Page</h1>
          {showAddTourDetails ? <AddTourDetailsForm /> : ''}
          {showDeleteTourDetails ? <DeleteTourDetailsButton /> : ''}
          <div>
            <button className='btn1 btn primary__btn mt-4' onClick={handleAddTourButtonClick}>Add Tour Details</button>
            <button className='btn1 btn primary__btn mt-4' onClick={handleDeleteTourButtonClick}>Delete Tour Details</button>
          </div>
        </div>
      </Col>
    </Container>
  );
}

function AddTourDetailsForm() {
  // Render the form to add tour details
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [distance, setDistance] = useState();
  const [price, setPrice] = useState();
  const [maxGroupSize, setMaxGroupSize] = useState();
  const [desc, setDesc] = useState("");
  const [photo, setPhoto] = useState([]);
  const [featured, setFeatured] = useState(false);

  //handle and convert it in base 64
 const handleImage = (e) =>{
  const file = e.target.files[0];
  setFileToBase(file);
  console.log(file);
}

const setFileToBase = (file) =>{
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () =>{
    setPhoto(reader.result);
  }

}

  const handleSubmit =  (e) => {
    e.preventDefault();


    const newTour = {
      title,
      city,
      address,
      distance,
      price,
      maxGroupSize,
      desc,
      reviews: [],
      photo: photo,
      featured,
    };

    
    console.log(newTour);

    fetch('http://localhost:4000/api/v1/tours', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(newTour),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);

       setTitle("");
       setCity("");
       setAddress("");
       setDistance("");
       setPrice("");
       setMaxGroupSize("");
       setDesc("");
       setPhoto("");
       setFeatured(false);

        // TODO: Add some feedback to the user that the tour was added successfully
        alert('Successfully added');

      })
      .catch((error) => {
        console.error('Error:', error);
        // TODO: Add some feedback to the user that there was an error adding the tour
        alert(error.message);
      });
  };

  return (
    <div className="form-input">
      <Form className="form-container" onSubmit={handleSubmit}>

        <FormGroup>
          <input type="text" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />

        </FormGroup>

        <FormGroup>
          <input type="text" placeholder='City' value={city} onChange={(e) => setCity(e.target.value)} />
        </FormGroup>

        <FormGroup>
          <input type="text" placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)} />
        </FormGroup>

        <FormGroup >
          <input type="number" placeholder="Distance" id='distance' required value={distance} onChange={(e) => setDistance(e.target.value)} />
        </FormGroup>

        <FormGroup>
          <input type="number" placeholder="Price" id='price' required value={price} onChange={(e) => setPrice(e.target.value)} />
        </FormGroup>

        <FormGroup>
          <input type="number" placeholder="MaxGroupSize" id='size' required value={maxGroupSize} onChange={(e) => setMaxGroupSize(e.target.value)} />
        </FormGroup>

        <FormGroup>
          <input type='text' placeholder='Desc' value={desc} onChange={(e) => setDesc(e.target.value)} />
        </FormGroup>


        <FormGroup>
          <input type="file"  name='photo' onChange={handleImage} />
        </FormGroup>



        <FormGroup>
          <label>
            <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
            Featured
          </label>
        </FormGroup>
        <button className="buy_btn btn primary__btn w-100 mt-4" type="submit" onSubmit={handleSubmit}>Add Tour</button>

      </Form>
    </div>
  );
}



function DeleteTourDetailsButton() {
  // Render the button to delete tour details
  const [page, SetPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const { data: tours, loading, error } = useFetch(`${BASE_URL}/tours?page=${page}`);
  const { data: tourCount } = useFetch(`${BASE_URL}/tours/search/getTourCount`);

  
  useEffect(() => {
    const pages = Math.ceil(tourCount / 8);
    setPageCount(pages);
    window.scrollTo(0, 0)
  }, [page, tourCount, tours]);

  const handleDeleteTour = (id) => {
    fetch(`${BASE_URL}/tours/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        // TODO: Add some feedback to the user that the tour was deleted successfully
        alert('Successfully deleted');
        
      })
      .catch((error) => {
        console.error('Error:', error);
        // TODO: Add some feedback to the user that there was an error deleting the tour
        alert(error.message);
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  { error && <h4 className="text-center pt-5">{error}</h4> }


  return (
    <Col lg="12">
    <div>
      <h2>Delete Tour Details</h2>
      <ul className="tour-list">
        {tours.map(tour => (
          <li key={tour._id}>
            <div className='tour-item'>
            <span className='tour-title' >{tour.title}</span>
            <button className='btn1 btn primary__btn mt-4' onClick={() => handleDeleteTour(tour._id)}>Delete</button>
            </div>
          </li>
          
        ))}
      </ul>

      <div className="pagination d-flex align-items-center
          justify-content-center mt-4 gap-3">
        {[...Array(pageCount).keys()].map(number => (
          <span
            key={number}
            onClick={() => SetPage(number)}
            className={page === number ? 'active__page' : ''}
          >
            {number + 1}
          </span>
        ))}
      </div>
     

    </div>
    </Col>

  );
}



export default Admin;
