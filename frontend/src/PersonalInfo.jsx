import { useState } from 'react';

export const PersonalInfo = ({formData, errors, setErrors, handleChange, handleFileChange, passwordStrength, usernameAvailable}) => {
    const passwordStrengthLabels = ['','Weak', 'Medium', 'Strong']; 
    const [previewUrl, setPreviewUrl] = useState('');

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!['image/jpeg', 'image/png'].includes(file.type)) {
            setErrors({ ...errors, profilePhoto: 'Only JPG/PNG allowed' });
            setPreviewUrl('');
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            setErrors({ ...errors, profilePhoto: 'Max size 2MB' });
            setPreviewUrl('');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result);
            handleFileChange(e);
            setErrors({ ...errors, profilePhoto: '' }); 
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 text-center">Personal Information</h2>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Profile Photo</label>
                <div className="flex items-center gap-4">
                    <label className="flex flex-col items-center px-4 py-6 bg-white rounded-lg border border-dashed border-gray-300 cursor-pointer hover:bg-gray-50">
                        <div className="flex flex-col items-center justify-center">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="mt-2 text-sm text-gray-600">Click to upload</span>
                        </div>
                        <input 
                            type="file" 
                            className="hidden"
                            accept="image/jpeg, image/png"
                            onChange={handleFileInputChange}
                        />
                    </label>
                    {previewUrl && (
                        <div className="relative">
                            <img 
                                src={previewUrl} 
                                alt="Preview" 
                                className="h-20 w-20 rounded-full object-cover border-2 border-gray-200"
                            />
                        </div>
                    )}
                </div>
                {errors.profilePhoto && <p className="mt-1 text-sm text-red-600">{errors.profilePhoto}</p>}
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <select 
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                {formData.gender === "Other" && (
                    <input
                        type="text"
                        name="customGender"
                        placeholder="Specify your gender"
                        value={formData.customGender}
                        onChange={handleChange}
                        className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                    />
                )}
            </div>

            
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <input
                    type="date"
                    name="dob"
                    max={new Date().toISOString().split('T')[0]}
                    value={formData.dob}
                    onChange={handleChange}
                    className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                />
            </div>

           
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                    autoComplete="off"
                    placeholder="Enter your username"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={`mt-1 block w-full shadow-sm sm:text-sm rounded-md ${errors.username ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}`}
                />
                {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
                {usernameAvailable === true && <p className="mt-1 text-sm text-green-600">✓ Username available</p>}
                {usernameAvailable === false && <p className="mt-1 text-sm text-red-600">✗ Username already taken</p>}
            </div>

           
            <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Password Update</h3>
                
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Current Password</label>
                    <input
                        autoComplete="current-password"
                        placeholder="Enter your current password"
                        type="password"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        className={`mt-1 block w-full shadow-sm sm:text-sm rounded-md ${errors.currentPassword ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}`}
                    />
                    {errors.currentPassword && <p className="mt-1 text-sm text-red-600">{errors.currentPassword}</p>}
                </div>
                
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">New Password</label>
                    <input
                        autoComplete="new-password"
                        placeholder="Enter a new password"
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className={`mt-1 block w-full shadow-sm sm:text-sm rounded-md ${errors.newPassword ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}`}
                    />
                    {errors.newPassword && <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>}
                    {passwordStrength>0 ? (
                    <div className="mt-2">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-700">Password Strength:</span>
                                <span className="text-sm font-medium">
                                {passwordStrengthLabels[passwordStrength]}
                            </span>
                        </div>
                        <div className="mt-1 w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                                className={`h-2.5 rounded-full ${
                                    passwordStrength === 1 ? 'bg-red-500 w-1/4' :
                                    passwordStrength === 2 ? 'bg-yellow-500 w-1/2' :
                                    'bg-green-500 w-full'
                                }`}
                            ></div>
                        </div>
                    </div>
                
                    ) : (
                        <span> </span>
                    )}
               </div>
            </div>
        </div>
    );
};