import React, { useState,useEffect } from 'react';
import './OrderForm.css';
import axios from 'axios';
import { TextField,Slider } from '@mui/material';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
// import { BrowserRouter as Router, Route, Routes,Outlet } from 'react-router-dom';

import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useOrderContext } from './../../Context/ContextStore';
import { fetchSuggestions } from '../../api';
// import ConfirmOrder from '../ConfirmOrder/ConfirmOrder';

const googleGeocodeKey = 'AIzaSyDR6tnaPuot91agdBkddaeLKxElH0cz-xM'; 

const OrderForm = () => {
          

          const [selectedWeight, setSelectedWeight] = useState(1);
          const [isChecked, setIsChecked] = useState(false);
          const [activeTab, setActiveTab] = useState('sender');
          const [errors, setErrors] = useState({});


          const { orderData, updateOrderData,isScheduled } = useOrderContext();

          const { pickupAddress, dropAddress ,senderPhone,senderName,senderEmail,receiverName,
                  receiverPhone,contentWeight,packageContent,pickupDate,pickupTime,instructions,
                  distance} = orderData; 
                  
          const [isLoading, setIsLoading] = useState(false); // Add loading state
          const navigate = useNavigate();
          const [pickupSuggestions, setPickupSuggestions] = useState([]);
          const [dropSuggestions, setDropSuggestions] = useState([]);
          
          useEffect(() => {
            const savedPickupCoordinates = JSON.parse(localStorage.getItem('pickupCoordinates')) || {};
            const savedDropCoordinates = JSON.parse(localStorage.getItem('dropCoordinates')) || {};
            const savedDistances = JSON.parse(localStorage.getItem('distances')) || {};
            const savedPickupSuggestions = JSON.parse(localStorage.getItem('pickupSuggestions')) || {};
            const savedDropSuggestions = JSON.parse(localStorage.getItem('dropSuggestions')) || {};
          
            setCache({
              pickupCoordinates: savedPickupCoordinates,
              dropCoordinates: savedDropCoordinates,
              distances: savedDistances,
              pickupSuggestions: savedPickupSuggestions,
              dropSuggestions: savedDropSuggestions,
            });
          }, []);

          const [cache, setCache] = useState({
            pickupCoordinates: {},
            dropCoordinates: {},
            distances: {},
            pickupSuggestions: {},
            dropSuggestions: {},
          });



          const handlePickupTimeChange = (newValue) => {
            if (newValue) {
              const formattedTime = formatTime(newValue); // Format the selected time
              updateOrderData({ pickupTime: formattedTime }); // Update context
            } else {
              updateOrderData({ pickupTime: null }); // Handle null case if time is cleared
            }
          };
          
          const formatTime = (date) => {
            if (!date) return '';
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${hours}:${minutes}`; // Return time in 'HH:mm' format
          };
          

          const handleWeightSelection = (event) => {
            const weight = event.target.value;
            setSelectedWeight(weight);
           
            updateOrderData({ contentWeight:weight  })
          };

          const handleCheckboxChange = (event) => {
            setIsChecked(event.target.checked);
          };

          const validateForm = () => {
            const newErrors = {};
        
            // Validate sender and receiver fields
            if (!senderName.match(/^[a-zA-Z\s]{2,}$/)) {
              newErrors.senderName = 'Name should contain only letters and be more than 2 characters.';
            }
            if (!senderPhone.match(/^\d{10}$/)) {
              newErrors.senderPhone = 'Phone number should be 10 digits.';
            }
            if (!senderEmail.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
              newErrors.senderEmail = 'Invalid email address.';
            }
            if (activeTab === 'receiver') {
              if (!receiverName.match(/^[a-zA-Z\s]{2,}$/)) {
                newErrors.receiverName = 'Name should contain only letters and be more than 2 characters.';
              }
              if (!receiverPhone.match(/^\d{10}$/)) {
                newErrors.receiverPhone = 'Phone number should be 10 digits.';
              }
            }
        
            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
          };



        const useDebounce = (callback, delay) => {
          const timeoutRef = React.useRef();

          const debouncedCallback = (...args) => {
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
              callback(...args);
            }, delay);
          };

          return debouncedCallback;
        };

        const DEBOUNCE_DELAY = 1000;


        const debouncedPickupAddressChange = useDebounce(async (value) => {
        
          updateOrderData({ pickupAddress: value });

          if (value.length > 2) {

            if (cache.pickupSuggestions[value]) {

              setPickupSuggestions(cache.pickupSuggestions[value]);
            } else {
            try {
              const response = await fetchSuggestions(value)
              
              setPickupSuggestions(response.data.predictions);
              setCache((prevCache) => {
                const updatedCache = {
                  ...prevCache,
                  pickupSuggestions: { ...prevCache.pickupSuggestions, [value]: response.data.predictions },
                };
                localStorage.setItem('pickupSuggestions', JSON.stringify(updatedCache.pickupSuggestions));
                return updatedCache;
              });
            } catch (error) {
              console.error('Error fetching pickup suggestions:', error);
            }
          }
          } else {
            setPickupSuggestions([]);
          }
        }, DEBOUNCE_DELAY);
    
  const handlePickupAddressChange = (event, value) => {
    debouncedPickupAddressChange(value);
  };

  const debouncedDropAddressChange = useDebounce(async (value) => {
    updateOrderData({ dropAddress: value });

    if (value.length > 2) {

        // Check local cache first
        if (cache.dropSuggestions[value]) {
          setDropSuggestions(cache.dropSuggestions[value]);
        } else {
      try {
        const response = await fetchSuggestions(value)
        console.log(response.data.predictions);
        setDropSuggestions(response.data.predictions);

          // Update cache
          setCache((prevCache) => {
            const updatedCache = {
              ...prevCache,
              dropSuggestions: { ...prevCache.dropSuggestions, [value]: response.data.predictions },
            };
            localStorage.setItem('dropSuggestions', JSON.stringify(updatedCache.dropSuggestions));
            return updatedCache;
          });
      } catch (error) {
        console.error('Error fetching drop suggestions:', error);
      }
    }
    } else {
      setDropSuggestions([]);
    }
  }, DEBOUNCE_DELAY);

  const handleDropAddressChange = (event, value) => {
    debouncedDropAddressChange(value);
  };



  // distance calculation
  const calculateDistance = async () => {

    
    // if (!pickupAddress || !dropAddress) {
      
    //   alert('Please select both pickup and drop addresses');
    //   return ;
    // }
    if (!pickupAddress || !dropAddress) {
      return;
    }

    
    const cacheKey = `${pickupAddress}-${dropAddress}`;
    
    // Check cache for previously calculated distance
    if (cache.distances[cacheKey]) {
      const cachedDistance = cache.distances[cacheKey];
      // setDistance(cachedDistance); 
      updateOrderData({ distance: cachedDistance });
      
      return; 
    }
    
    setIsLoading(true); // Start loading
    
    try {
      let pickupLocation, dropLocation;
      
      // Fetch pickup coordinates
      if (cache.pickupCoordinates[pickupAddress]) {
        pickupLocation = cache.pickupCoordinates[pickupAddress];
        
      } else {
        const pickupResponse = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
          params: {
            address: pickupAddress,
            key: googleGeocodeKey,
          },
        });
  
        if (pickupResponse.data.status === 'OK') {
          pickupLocation = pickupResponse.data.results[0].geometry.location;
          // Update cache with pickup coordinates
          setCache((prevCache) => {
            const updatedCache = {
              ...prevCache,
              pickupCoordinates: {
                ...prevCache.pickupCoordinates,
                [pickupAddress]: pickupLocation,
              },
            };
            localStorage.setItem('pickupCoordinates', JSON.stringify(updatedCache.pickupCoordinates));
            return updatedCache;
          });
        } else {
          alert('Geocoding was not successful for the pickup address. Please try again.');
          return;
        }
      }
  
      // Fetch drop coordinates
      if (cache.dropCoordinates[dropAddress]) {
        dropLocation = cache.dropCoordinates[dropAddress];
      } else {
        const dropResponse = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
          params: {
            address: dropAddress,
            key: googleGeocodeKey,
          },
        });
  
        if (dropResponse.data.status === 'OK') {
          dropLocation = dropResponse.data.results[0].geometry.location;
          // Update cache with drop coordinates
          setCache((prevCache) => {
            const updatedCache = {
              ...prevCache,
              dropCoordinates: {
                ...prevCache.dropCoordinates,
                [dropAddress]: dropLocation,
              },
            };
            localStorage.setItem('dropCoordinates', JSON.stringify(updatedCache.dropCoordinates));
            return updatedCache;
          });
        } else {
          alert('Geocoding was not successful for the drop address. Please try again.');
          return;
        }
      }
      
      const origins = `${pickupLocation.lat},${pickupLocation.lng}`;
      const destinations = `${dropLocation.lat},${dropLocation.lng}`;
      
      // Fetch distance using your server's distance matrix endpoint
      const distanceResponse = await axios.get('http://13.126.174.229:5000/api/user/distance-matrix', {
        params: {
          origins,
          destinations,
          // key: googleGeocodeKey 13.126.174.229,
        },
      });

      const distanceValue = distanceResponse.data.rows[0].elements[0].distance.text;
      console.log(distanceValue);
      // setDistance(distanceValue); // Set the calculated distance
      updateOrderData({ distance: distanceValue });

      // Update cache with new distance
      setCache((prevCache) => {
        const updatedCache = {
          ...prevCache,
          distances: {
            ...prevCache.distances,
            [cacheKey]: distanceValue,
          },
        };
        localStorage.setItem('distances', JSON.stringify(updatedCache.distances));
        return updatedCache;
      });
      
      setIsLoading(false); 
    } catch (error) {
     
      console.error('Error calculating distance:', error);
      alert('An error occurred while calculating the distance.');
      
    }
  };
  

  const handleSubmit = async (event) => {

    event.preventDefault(); // Prevent default form submission
    if (!validateForm()) return;
    //  setIsLoading(true)
    const orderDataToSubmit = {
      ...orderData,
      serviceType: isScheduled ? "Schedule for Later" : "Delivery Now",
    };
   
    localStorage.setItem('orderDetails', JSON.stringify(orderDataToSubmit));
    
    // setIsLoading(false)
    // Navigate to the confirm order page
    if (!distance || !contentWeight) {
      alert("Please enter distance and weight");
      return;
    }
    
    try {
      const response = await fetch('http://13.126.174.229:5000/api/user/calculate_fare', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          distance: parseFloat(distance.split(' ')[0]),
          weight: contentWeight,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/confirm', { state: { totalAmount: data.totalAmount, baseFare: data.baseFare, extraFarePerKm: data.extraFarePerKm, distance:data.distance, weight:data.weight,weightFare:data.weightFare }});
      } 
    } catch (error) {
      console.error('Error making API call:', error);
    } 

    // console.log('Order Data:', orderDataToSubmit);
};

  return (

    <>
    {isLoading && (
        <div className="oM-spinner-overlay">
          <span className="oM-spinner"></span>
        </div>
      )}
      <div className="oM-order-container">
        <div className="oM-order-form">
          <h2 className="oM-order-header">{isScheduled?"Schedule for Later":"Delivery Now"}</h2>
          <div className="oM-tab-bar">
            <div
              className={`oM-tab ${activeTab === 'sender' ? 'active' : ''}`}
              onClick={() => setActiveTab('sender')}
            >
              Sender Details
            </div>
            <div
              className={`oM-tab ${activeTab === 'receiver' ? 'active' : ''}`}
              onClick={() => setActiveTab('receiver')}
            >
              Receiver Details
            </div>
          </div>
          <form className="oM-oM-order-form-elements" onSubmit={handleSubmit}>
            {activeTab === 'sender' && (
              <>
                <div className="oM-oM-form-group">
                  <label htmlFor="number" className="oM-oM-form-label">Phone Number</label>
                  
                  <TextField
                    placeholder="Enter your number"
                    type="tel"
                    id="number"
                    name="number"
                    className="oM-oM-form-input"
                    required
                    value={senderPhone}
                    onChange={(e) => updateOrderData({ senderPhone: e.target.value })} 
                    fullWidth
                    margin="normal"
                    sx={{
                      '& .MuiInputBase-root': {
                        height: '40px', // Adjust the height as needed
                      },                
                    }}

                  />
                    {errors.senderPhone && <p className="oM-error-message">{errors.senderPhone}</p>}
                </div>
                <div className="oM-form-group">
                  <label htmlFor="name" className="oM-form-label">Name</label>
                  <TextField
                    placeholder="Enter your name"
                    type="text"
                    id="name"
                    name="name"
                    className="oM-form-input"
                    required
                    value={senderName}
                    onChange={(e) => updateOrderData({ senderName: e.target.value })} 
                    fullWidth
                    margin="normal"
                    sx={{
                      '& .MuiInputBase-root': {
                        height: '40px', // Adjust the height as needed
                      },                
                    }}
                  />
                    {errors.senderName && <p className="oM-error-message">{errors.senderName}</p>}
                </div>
                <div className="oM-form-group">
                  <label htmlFor="email" className="oM-form-label">Email</label>
                
                  <TextField
                    placeholder="Enter your email"
                    type="email"
                    id="email"
                    name="email"
                    className="oM-form-input"
                    required
                    value={senderEmail}
                    onChange={(e) => updateOrderData({ senderEmail: e.target.value })} 
                    fullWidth
                    margin="normal"
                    sx={{
                      '& .MuiInputBase-root': {
                        height: '40px', // Adjust the height as needed
                      },                
                    }}
                  />
                    {errors.senderEmail && <p className="oM-error-message">{errors.senderEmail}</p>}
                </div>
                <div className="oM-form-group">
                  <label htmlFor="pickup-address" className="oM-form-label">Pickup Address</label>
                  
                   <Autocomplete
                  freeSolo
                  options={pickupSuggestions.length > 0 ? pickupSuggestions.map((option) => option.description) : []}
                  onInputChange={handlePickupAddressChange}
                  onBlur={calculateDistance} // Trigger distance calculation on blur
                  onChange={(event, newValue) => {
                    if (typeof newValue === 'string') {
                      updateOrderData({ pickupAddress: newValue });
                    } else if (newValue && newValue.description) {
                      updateOrderData({ pickupAddress: newValue.description });
                    }
                  }}
                  value={pickupAddress}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Enter Pickup Address"
                      fullWidth
                      margin="normal"
                      className="oM-form-input"
                      sx={{
                        '& .MuiInputBase-root': {
                          height: '40px', // Adjust the height as needed
                        },                
                      }}
                    />
                  )}
                />
                </div>
    
                 <div className="oM-form-group">
                <label htmlFor="content-weight" className="oM-form-label">Content Weight</label>
                <div className="oM-weight-slider" style={{ width: '100%' , padding:'0px 10px' }}>
                 
                   <Slider
                    value={selectedWeight}
                    onChange={handleWeightSelection}
                    aria-labelledby="weight-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    min={1}
                    max={20}
                    marks
                  />
                  <datalist id="weightOptions">
                    {[...Array(50).keys()].map((weight) => (
                      <option key={weight + 1} value={weight + 1} label={`${weight + 1} kg`}></option>
                    ))}
                  </datalist>
                  Selected Weight: {selectedWeight} kg
                </div>
                
              </div>

             
                {isScheduled && (
                  <>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <div className="oM-form-group">
                      <label htmlFor="pickup-date" className="oM-form-label">Pickup Date</label>
                      <DatePicker
                        id="pickup-date"
                       className="oM-form-input"
                        value={pickupDate}
                        onChange={(newValue) => updateOrderData({ pickupDate: newValue })}
                        textField={<TextField variant="outlined" fullWidth required />}
                      />
                    </div>
                  </LocalizationProvider>
                  
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <div className="oM-form-group">
                    <label htmlFor="pickup-time" className="oM-form-label">Pickup Time</label>
                      <TimePicker
                    id="pickup-time"
                    className="oM-form-input"
                    value={pickupTime ? new Date(`1970-01-01T${pickupTime}:00`) : null}
                    onChange={handlePickupTimeChange}
                    textField={<TextField variant="outlined" fullWidth required />}
                  />
                  </div>
                </LocalizationProvider>
                  </>
                )}
               
              <div className="oM-form-group" mt={2}>
              <FormControl fullWidth variant="outlined"
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  height: '50px', 
                  marginTop:'10px',
                  '& .MuiSelect-select': {
                    padding: '10px 14px', 
                  },
                },
              }}
              >
                <InputLabel id="package-content-label">Select Package Content</InputLabel>
                <Select
                  labelId="package-content-label"
                  id="package-content"
                  name="package-content"
                  value={packageContent}
                  onChange={(e) => 
                  {  
                    updateOrderData({ packageContent: e.target.value })
                  
                    if (e.target.value) {
                      setActiveTab('receiver');
                    }
                  }
                }
                  label="Select Package Content" // Ensure label is associated with Select
                 
                >
                  <MenuItem value="">
                    <em>Select Package Content</em>
                  </MenuItem>
                  <MenuItem value="documents">Documents/Books</MenuItem>
                  <MenuItem value="clothes">Clothes/Accessories</MenuItem>
                  <MenuItem value="food">Food/Packages</MenuItem>
                  <MenuItem value="household">Household Items</MenuItem>
                  <MenuItem value="electronics">Electronic Equipment</MenuItem>
                </Select>
              </FormControl>
            </div>
              </>
            )}
            {activeTab === 'receiver' && (
              <>
                <div className="oM-form-group">
                  <label htmlFor="receiver-name" className="oM-form-label">Receiver Name</label>
                
                    <TextField
                    placeholder="Enter your receiver name"
                    type="text"
                    id="receiver-name"
                    name="receiver-name"
                    className="oM-form-input"
                    required
                    value={receiverName}
                    onChange={(e) => updateOrderData({ receiverName: e.target.value })} 
                    fullWidth
                    margin="normal"
                    sx={{
                      '& .MuiInputBase-root': {
                        height: '40px', // Adjust the height as needed
                      },                
                    }}
                  
                  />
                   {errors.receiverName && <p className="oM-error-message">{errors.receiverName}</p>}
                </div>
                <div className="oM-form-group">
                  <label htmlFor="receiver-number" className="oM-form-label">Receiver Number</label>
                 
                    <TextField
                    placeholder="Enter your receiver number"
                    type="tel"
                    id="receiver-number"
                    name="receiver-number"
                    className="oM-form-input"
                    required
                    value={receiverPhone}
                    onChange={(e) => updateOrderData({ receiverPhone: e.target.value })} 
                    fullWidth
                    margin="normal"
                    sx={{
                      '& .MuiInputBase-root': {
                        height: '40px',
                      },                
                    }}
                  
                  />
                   {errors.receiverPhone && <p className="oM-error-message">{errors.receiverPhone}</p>}
                </div>
                <div className="oM-form-group">
                  <label htmlFor="drop-address" className="oM-form-label">Drop Address</label>
        
                  <Autocomplete
                  freeSolo
                  options={dropSuggestions.length > 0 ? dropSuggestions.map((option) => option.description) : []}
                  onInputChange={handleDropAddressChange}
                  onBlur={calculateDistance} // Trigger distance calculation on blur
                  onChange={(event, newValue) => {
                    if (typeof newValue === 'string') {
                      updateOrderData({ dropAddress: newValue });
                    } else if (newValue && newValue.description) {
                      updateOrderData({ dropAddress: newValue.description });
                    }
                  }}
                  value={dropAddress}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Enter Drop Address"
                      fullWidth
                      margin="normal"
                      className="oM-form-input"
                      sx={{
                        '& .MuiInputBase-root': {
                          height: '40px',
                        },                
                      }}
                    />
                  )}
                />
                </div>
               
                <div className="oM-form-group">
                  <label htmlFor="instructions" className="oM-form-label">Instructions for Delivery Boy</label>
                  
                  <TextField
                    placeholder="Enter instructions for delivery hero if any?"
                    id="instructions"
                    name="instructions"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={instructions}
                    onChange={(e) => updateOrderData({instructions: e.target.value})}
                    fullWidth
                  />
                </div>

          <div className="oM-checkbox-container">
          <input
            type="checkbox"
            id="terms-checkbox"
            name="terms-checkbox"
            className="oM-form-checkbox"
            checked={isChecked}
            // onClick={calculateDistance}
            onChange={handleCheckboxChange}
            disabled={!pickupAddress || !dropAddress}
            required
          />
          <label htmlFor="terms-checkbox" className="oM-checkbox-label">
            By confirming I accept this order doesn’t contain illegal/restricted items. If illegal/restricted items are found by Turtu Partner, they may report it to the law enforcement authorities. <a href="/terms" target="_blank">Terms and conditions</a>
          </label>
        </div>
              </>
            )}
            
        <button 
        disabled={!pickupAddress || !dropAddress}
         type="submit" className="oM-form-button">Confirm Order</button>
          </form>
   
        </div>
        
      </div>
    </>
  );
};
export default OrderForm;

