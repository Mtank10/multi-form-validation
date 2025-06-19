import React, { useState, useEffect } from 'react';
import {PersonalInfo} from './PersonalInfo';
import {ProfessionalDetails} from './ProfessionalDetails';
import {Preferences} from './Preferencs';

import { fetchCountries, fetchStates, fetchCities } from './MockApi';

function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    profilePhoto: null,
    username: '',
    currentPassword: '',
    newPassword: '',
    profession: '',
    companyName: '',
    addressLine1: '',
    country: '',
    state: '',
    city: '',
    subscriptionPlan: '',
    newsletter: true,
    gender: '',
    customGender: '',
    dob: ''
  });
  
  const [errors, setErrors] = useState({});
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

 
useEffect(() => {
  const loadCountries = async () => {
    const data = await fetchCountries();
    setCountries(data);
  };
  loadCountries();
}, []);


useEffect(() => {
  if (formData.country) {
    const loadStates = async () => {
      const data = await fetchStates(formData.country);
      setStates(data);
      setFormData(prev => ({ ...prev, state: '', city: '' }));
    };
    loadStates();
  }
}, [formData.country]);


useEffect(() => {
  if (formData.state) {
    const loadCities = async () => {
      const data = await fetchCities(formData.state);
      setCities(data);
      setFormData(prev => ({ ...prev, city: '' }));
    };
    loadCities();
  }
}, [formData.state]);
  
  
  useEffect(() => {
    const checkUsername = async () => {
      if (formData.username.length >= 4 && formData.username.length <= 20) {
        const response = await fetch('https://multi-form-validation-fxsc.vercel.app/api/check-username', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: formData.username })
        });
        const { available } = await response.json();
        setUsernameAvailable(available);
      }
    };
    
    const timer = setTimeout(() => {
      if (formData.username) checkUsername();
    }, 500);
    
    return () => clearTimeout(timer);
  }, [formData.username]);

 
  useEffect(() => {
    if (formData.newPassword) {
      let strength = 0;
      if (formData.newPassword.length >= 8) strength++;
      if (/\d/.test(formData.newPassword)) strength++;
      if (/[!@#$%^&*]/.test(formData.newPassword)) strength++;
      setPasswordStrength(strength);
    } else {
      setPasswordStrength(0);
    }
  }, [formData.newPassword]);

  const validateStep = () => {
    const newErrors = {};
    
    switch(step) {
      case 1:
        if (!formData.profilePhoto) newErrors.profilePhoto = 'Required';
        if (!formData.username.trim()) newErrors.username = 'Required';
        else if (formData.username.length < 4 || formData.username.length > 20) 
          newErrors.username = 'Must be 4-20 characters';
        else if (/\s/.test(formData.username)) 
          newErrors.username = 'No spaces allowed';
        else if (usernameAvailable === false) 
          newErrors.username = 'Username taken';
        
        if (formData.newPassword) {
          if (!formData.currentPassword) 
            newErrors.currentPassword = 'Current password required';
          
          if (formData.newPassword.length < 8) 
            newErrors.newPassword = 'At least 8 characters';
          if (!/\d/.test(formData.newPassword)) 
            newErrors.newPassword = 'At least one number';
          if (!/[!@#$%^&*]/.test(formData.newPassword)) 
            newErrors.newPassword = 'At least one special character';
        }
        break;
      
      case 2:
        if (!formData.profession) newErrors.profession = 'Required';
        if (formData.profession === 'Entrepreneur' && !formData.companyName.trim())
          newErrors.companyName = 'Required for entrepreneurs';
        if (!formData.addressLine1.trim()) 
          newErrors.addressLine1 = 'Required';
        break;
      
      case 3:
        if (!formData.country) newErrors.country = 'Required';
        if (!formData.state) newErrors.state = 'Required';
        if (!formData.city) newErrors.city = 'Required';
        if (!formData.subscriptionPlan) 
          newErrors.subscriptionPlan = 'Required';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = async () => {
    const response = await fetch('https://multi-form-validation-fxsc.vercel.app/api/save-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    if (response.ok) {
      alert('Profile saved successfully!');
      setStep(1);
      setFormData({
        profilePhoto: null,
        username: '',
        currentPassword: '',  
        newPassword: '',
        profession: '',
        companyName: '',
        addressLine1: '',
        country: '',
        state: '',
        city: '',
        subscriptionPlan: '',
        newsletter: true, 
      });
      setErrors({});
      setUsernameAvailable(null);
      setPasswordStrength(0);
      setCountries([]);
      setStates([]);
      setCities([]);
    } else {
      alert('Error saving profile');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setFormData(prev => ({
      ...prev,
      profilePhoto: file.name // Store file name or other metadata
    }));
  }
};

  return (
    <div className="flex flex-col items-center mx-auto p-4">
      {step === 1 && (
        <PersonalInfo 
          formData={formData}
          errors={errors}
          setErrors={setErrors}
          handleChange={handleChange}
          handleFileChange={handleFileChange}
          passwordStrength={passwordStrength}
          usernameAvailable={usernameAvailable}
        />
      )}
      
      {step === 2 && (
        <ProfessionalDetails 
          formData={formData}
          errors={errors}
          handleChange={handleChange}
        />
      )}
      
      {step === 3 && (
        <Preferences 
          formData={formData}
          errors={errors}
          handleChange={handleChange}
          countries={countries}
          states={states}
          cities={cities}
        />
      )}
      
      {step === 4 && (
  <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your Profile Summary</h2>
    
    {/* Personal Information Section */}
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-blue-600 border-b pb-2 mb-4">Personal Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
        
          <p className="text-gray-500">Profile Photo:</p>
          {formData.profilePhoto && (
  <div className="flex items-center mt-2">
    <img 
      src={URL.createObjectURL(new Blob([formData.profilePhoto], { type: 'image/jpeg' }))} 
      alt="Profile Preview" 
      className="h-16 w-16 rounded-full object-cover mr-4"
    />
    <span className="text-gray-700">{formData.profilePhoto.name}</span>
  </div>
)}
        </div>
        <div>
          <p className="text-gray-500">Username:</p>
          <p className="font-medium">{formData.username}</p>
        </div>
        <div>
          <p className="text-gray-500">Gender:</p>
          <p className="font-medium">
            {formData.gender === 'Other' ? formData.customGender : formData.gender || 'Not specified'}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Date of Birth:</p>
       <p className="font-medium">
  {formData.dob ? new Date(formData.dob).toLocaleDateString() : 'Not specified'}
</p>
 </div>
      </div>
    </div>

    {/* Professional Information Section */}
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-blue-600 border-b pb-2 mb-4">Professional Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-gray-500">Profession:</p>
          <p className="font-medium">{formData.profession || 'Not specified'}</p>
        </div>
        {formData.profession === 'Entrepreneur' && (
          <div>
            <p className="text-gray-500">Company Name:</p>
            <p className="font-medium">{formData.companyName}</p>
          </div>
        )}
        <div className="md:col-span-2">
          <p className="text-gray-500">Address:</p>
          <p className="font-medium">{formData.addressLine1}</p>
        </div>
      </div>
    </div>

    {/* Location Section */}
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-blue-600 border-b pb-2 mb-4">Location</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <p className="text-gray-500">Country:</p>
          <p className="font-medium">{formData.country}</p>
        </div>
        <div>
          <p className="text-gray-500">State:</p>
          <p className="font-medium">{formData.state}</p>
        </div>
        <div>
          <p className="text-gray-500">City:</p>
          <p className="font-medium">{formData.city}</p>
        </div>
      </div>
    </div>

    {/* Preferences Section */}
    <div>
      <h3 className="text-xl font-semibold text-blue-600 border-b pb-2 mb-4">Preferences</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-gray-500">Subscription Plan:</p>
          <p className="font-medium">{formData.subscriptionPlan || 'Not selected'}</p>
        </div>
        <div>
          <p className="text-gray-500">Newsletter Subscription:</p>
          <p className={`font-medium ${formData.newsletter ? 'text-green-600' : 'text-red-600'}`}>
            {formData.newsletter ? 'Subscribed' : 'Not Subscribed'}
          </p>
        </div>
      </div>
    </div>

    {/* Password Update Section (if applicable) */}
    {formData.newPassword && (
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-700 mb-2">Password Updated</h3>
        <p className="text-blue-600">Your password has been changed successfully.</p>
      </div>
    )}
  </div>
)}
      
      <div className="mt-8 w-full max-w-2xl flex justify-between">
  {step > 1 && (
    <button 
      onClick={prevStep}
      className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
    >
      ← Back
    </button>
  )}
  {step < 4 ? (
    <button 
      onClick={nextStep}
      className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      Continue →
    </button>
  ) : (
    <button 
      onClick={handleSubmit}
      className="ml-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
    >
      Submit Profile
    </button>
  )}
</div>
    </div>
  );
}

export default App;