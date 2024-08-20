import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [backendData, setBackendData] = useState([{}]);
  const [userData, setUserData] = useState();
  const [gender, setGender] = useState('any');
  const [nationality, setNationality] = useState('any');

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const handleNationalityChange = (event) => {
    setNationality(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // do fetch call here for random user
    fetch(`/user?gender=${gender}&nat=${nationality}`)
    .then((response) => response.json())
    .then((data) => {
      setUserData(data.results[0]);
    });
  };

  const getCustomLoanOffer = (age) => {
// < 30 -> Low-interest student loans available!
// < 50: Competitive mortgage rates just for you!
// >= 50: Secure your retirement with our senior loans!
    let offer = '';
    if (age > 30) {
      offer = 'Competitive mortgage rates just for you!';
    }
    else if (age >= 50) {
      offer = 'Secure your retirement with our senior loans!';
    } else {
      offer = 'Low-interest student loans available!';
    }
    return offer;
  };
  useEffect(() => {
    fetch('/api')
    .then(
      (response) => response.json()
    ).then(
      (data) => {
        setBackendData(data);
    });
  }, []);

  return (
    <div className='container'>
      {/* {(typeof backendData.users === 'undefined') ? (
        <p>Loading...</p>
      ) : (
        backendData.users.map((user, i) => (
          <p key={i}>{user}</p>
        ))
      )} */}
      {(userData) ? (<img src={userData.picture.medium} alt="userImage" style={{height: '10rem', width: '10rem'}}/>) : (<img src={logo} alt="userImage" style={{height: '10rem', width: '10rem'}}/>)}
      <form id='random-user-form' onSubmit={handleSubmit}>
        <div className='form-container'>
          <div className='container-group'>
            <div className='form-group'>
              <label htmlFor='gender_field'>Gender:</label>
              <select
                name='gender_field'
                value={gender}
                onChange={(event) => handleGenderChange(event)}
              >
                <option value='any'>Any</option>
                <option value='female'>Female</option>
                <option value='male'>Male</option>
              </select>
            </div>
            <div className='form-group'>
              <label htmlFor='nationality_field'>Nationality:</label>
              <select
                name='nationality_field'
                value={nationality}
                onChange={(event) => handleNationalityChange(event)}
              >
                <option value='any'>Any</option>
                <option>AU</option>
                <option>BR</option>
                <option>CA</option>
                <option>CH</option>
                <option>DE</option>
                <option>DK</option>
                <option>ES</option>
                <option>FI</option>
                <option>FR</option>
                <option>GB</option>
                <option>IE</option>
                <option>IN</option>
                <option>IR</option>
                <option>MX</option>
                <option>NL</option>
                <option>NO</option>
                <option>NZ</option>
                <option>RS</option>
                <option>TR</option>
                <option>UA</option>
                <option>US</option>
              </select>
            </div>
          </div>
          <button type="submit" className='submitBtn'>Get Random User</button>
        </div>
      </form>

      {(userData) ?
        (<div className='userInfo'>
          <div className='info-group'>
              <label htmlFor='name'>Name:</label>
              <p name='name'>{userData.name.first + ' ' + userData.name.last}</p>
          </div>
          <div className='info-group'>
              <label htmlFor='age'>Age:</label>
              <p name='age'>{userData.dob.age}</p>
          </div>
          <div className='info-group'>
              <label htmlFor='location'>Location:</label>
              <p name='location'>{userData.location.city + ', ' + userData.location.country}</p>
          </div>
          <div className='info-group'>
              <label htmlFor='nationality'>Nationality:</label>
              <p name='nationality' className='info-item'>{userData.nat}</p>
          </div>
          <div className='info-group'>
              <label htmlFor='email' className='info-item'>Email:</label>
              <p name='email'>{userData.email}</p>
          </div>
          <div className='info-group'>
              <label htmlFor='loanOffer' className='info-item'>Loan Offer:</label>
              <p name='loanOffer'>{getCustomLoanOffer(userData.dob.age)}</p>
          </div>
        </div>) : (<></>)
      }
      
    </div>
  );
}

export default App;
