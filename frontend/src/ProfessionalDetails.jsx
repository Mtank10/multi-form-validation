import React from 'react';

export const ProfessionalDetails = ({ formData, errors, handleChange }) => {
    return (
        <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 text-center">Professional Details</h2>
            
            {/* Profession */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Profession</label>
                <select
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                    className={`mt-1 block w-full pl-3 pr-10 py-2 text-base rounded-md focus:outline-none sm:text-sm ${
                        errors.profession ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 
                        'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                >
                    <option value="">Select Profession</option>
                    <option value="Student">Student</option>
                    <option value="Developer">Developer</option>
                    <option value="Entrepreneur">Entrepreneur</option>
                </select>
                {errors.profession && <p className="mt-1 text-sm text-red-600">{errors.profession}</p>}
            </div>
            
            {/* Company Name (Conditional) */}
            {formData.profession === 'Entrepreneur' && (
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Company Name</label>
                    <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        className={`mt-1 block w-full shadow-sm sm:text-sm rounded-md ${
                            errors.companyName ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 
                            'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                        }`}
                    />
                    {errors.companyName && <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>}
                </div>
            )}
            
            {/* Address Line 1 */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Address Line 1</label>
                <input
                    type="text"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleChange}
                    className={`mt-1 block w-full shadow-sm sm:text-sm rounded-md ${
                        errors.addressLine1 ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 
                        'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                />
                {errors.addressLine1 && <p className="mt-1 text-sm text-red-600">{errors.addressLine1}</p>}
            </div>
        </div>
    );
};