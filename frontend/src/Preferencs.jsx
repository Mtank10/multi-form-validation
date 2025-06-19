import React from 'react';

export const Preferences = ({ 
    formData, 
    errors, 
    handleChange, 
    countries, 
    states, 
    cities 
}) => {
    return (
        <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 text-center">Preferences</h2>
            
            {/* Country */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Country</label>
                <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className={`mt-1 block w-full pl-3 pr-10 py-2 text-base rounded-md focus:outline-none sm:text-sm ${
                        errors.country ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 
                        'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                >
                    <option value="">Select Country</option>
                    {countries.map((country, index) => (
                        <option key={index} value={country.name}>
                            {country.name}
                        </option>
                    ))}
                </select>
                {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
            </div>
            
            {/* State */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">State</label>
                <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    disabled={!formData.country}
                    className={`mt-1 block w-full pl-3 pr-10 py-2 text-base rounded-md focus:outline-none sm:text-sm ${
                        errors.state ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 
                        'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    } ${!formData.country ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                >
                    <option value="">{formData.country ? 'Select State' : 'Select Country First'}</option>
                    {states.map((state, index) => (
                        <option key={index} value={state}>
                            {state}
                        </option>
                    ))}
                </select>
                {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
            </div>
            
            {/* City */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">City</label>
                <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    disabled={!formData.state}
                    className={`mt-1 block w-full pl-3 pr-10 py-2 text-base rounded-md focus:outline-none sm:text-sm ${
                        errors.city ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 
                        'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    } ${!formData.state ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                >
                    <option value="">{formData.state ? 'Select City' : 'Select State First'}</option>
                    {cities.map((city, index) => (
                        <option key={index} value={city}>
                            {city}
                        </option>
                    ))}
                </select>
                {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
            </div>
            
            {/* Subscription Plan */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Subscription Plan</label>
                <div className="mt-1 space-y-2">
                    {['Basic', 'Pro', 'Enterprise'].map(plan => (
                        <div key={plan} className="flex items-center">
                            <input
                                id={`plan-${plan}`}
                                name="subscriptionPlan"
                                type="radio"
                                value={plan}
                                checked={formData.subscriptionPlan === plan}
                                onChange={handleChange}
                                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                            />
                            <label htmlFor={`plan-${plan}`} className="ml-3 block text-sm font-medium text-gray-700">
                                {plan}
                            </label>
                        </div>
                    ))}
                </div>
                {errors.subscriptionPlan && <p className="mt-1 text-sm text-red-600">{errors.subscriptionPlan}</p>}
            </div>
            
            {/* Newsletter */}
            <div className="flex items-start">
                <div className="flex items-center h-5">
                    <input
                        id="newsletter"
                        name="newsletter"
                        type="checkbox"
                        checked={formData.newsletter}
                        onChange={handleChange}
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                </div>
                <div className="ml-3 text-sm">
                    <label htmlFor="newsletter" className="font-medium text-gray-700">Subscribe to Newsletter</label>
                    <p className="text-gray-500">Get the latest news and updates</p>
                </div>
            </div>
        </div>
    );
};