import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import resourceService from "../../services/resourceService";
import LocationPicker from "../../components/maps/LocationPicker";
import DashboardLayout from "../../components/layout/DashboardLayout";

const AddResource = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    resourceType: "water", // Default type
    quantity: 0,
    availableQuantity: 0,
    location: {
      type: "Point",
      coordinates: [0, 0] // [longitude, latitude]
    },
    address: "",
    contactPerson: {
      name: "",
      phone: ""
    },
    availableUntil: ""
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const resourceTypes = [
    { value: "water", label: "Drinking Water" },
    { value: "food", label: "Food" },
    { value: "shelter", label: "Shelter" },
    { value: "medical", label: "Medical Supplies" },
    { value: "clothing", label: "Clothing" },
    { value: "hygiene", label: "Hygiene Products" },
    { value: "other", label: "Other" }
  ];
  
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else if (name === "quantity" || name === "availableQuantity") {
      setFormData({
        ...formData,
        [name]: type === "number" ? parseInt(value) : value
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const handleLocationChange = (location, address) => {
    setFormData({
      ...formData,
      location: {
        type: "Point",
        coordinates: [location.lng, location.lat]
      },
      address
    });
  };
  
  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Resource name is required";
    if (!formData.description) newErrors.description = "Description is required";
    if (formData.quantity <= 0) newErrors.quantity = "Quantity must be greater than 0";
    if (formData.availableQuantity <= 0) newErrors.availableQuantity = "Available quantity must be greater than 0";
    if (formData.availableQuantity > formData.quantity) {
      newErrors.availableQuantity = "Available quantity cannot exceed total quantity";
    }
    if (formData.location.coordinates[0] === 0 && formData.location.coordinates[1] === 0) {
      newErrors.location = "Please select a location on the map";
    }
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.contactPerson.name) newErrors["contactPerson.name"] = "Contact person name is required";
    if (!formData.contactPerson.phone) newErrors["contactPerson.phone"] = "Contact person phone is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validate()) {
      setLoading(true);
      
      try {
        // Add the NGO ID as the provider
        const resourceDataToSend = {
          ...formData,
          providedBy: currentUser.id
        };
        
        await resourceService.addResource(resourceDataToSend);
        navigate("/resources");
      } catch (err) {
        setErrors({
          submit: err.response?.data?.message || "Failed to add resource. Please try again."
        });
      } finally {
        setLoading(false);
      }
    }
  };
  
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Add New Resource</h3>
            
            {errors.submit && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{errors.submit}</p>
                  </div>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Resource Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
                      errors.name ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="E.g., Drinking Water, Medical Supplies"
                  />
                  {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                    className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
                      errors.description ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Detailed description of the resource"
                  />
                  {errors.description && <p className="mt-2 text-sm text-red-600">{errors.description}</p>}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="resourceType" className="block text-sm font-medium text-gray-700">
                      Resource Type
                    </label>
                    <select
                      id="resourceType"
                      name="resourceType"
                      value={formData.resourceType}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    >
                      {resourceTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="availableUntil" className="block text-sm font-medium text-gray-700">
                      Available Until
                    </label>
                    <input
                      type="date"
                      id="availableUntil"
                      name="availableUntil"
                      value={formData.availableUntil}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                      Total Quantity
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      min="0"
                      className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
                        errors.quantity ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.quantity && <p className="mt-2 text-sm text-red-600">{errors.quantity}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="availableQuantity" className="block text-sm font-medium text-gray-700">
                      Available Quantity
                    </label>
                    <input
                      type="number"
                      id="availableQuantity"
                      name="availableQuantity"
                      value={formData.availableQuantity}
                      onChange={handleChange}
                      min="0"
                      className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
                        errors.availableQuantity ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.availableQuantity && <p className="mt-2 text-sm text-red-600">{errors.availableQuantity}</p>}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Resource Location
                  </label>
                  <LocationPicker onLocationSelect={handleLocationChange} height="300px" />
                  {errors.location && <p className="mt-2 text-sm text-red-600">{errors.location}</p>}
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
                      errors.address ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Full address of resource location"
                  />
                  {errors.address && <p className="mt-2 text-sm text-red-600">{errors.address}</p>}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contactPerson.name" className="block text-sm font-medium text-gray-700">
                      Contact Person Name
                    </label>
                    <input
                      type="text"
                      id="contactPerson.name"
                      name="contactPerson.name"
                      value={formData.contactPerson.name}
                      onChange={handleChange}
                      className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
                        errors["contactPerson.name"] ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors["contactPerson.name"] && <p className="mt-2 text-sm text-red-600">{errors["contactPerson.name"]}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="contactPerson.phone" className="block text-sm font-medium text-gray-700">
                      Contact Person Phone
                    </label>
                    <input
                      type="text"
                      id="contactPerson.phone"
                      name="contactPerson.phone"
                      value={formData.contactPerson.phone}
                      onChange={handleChange}
                      className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
                        errors["contactPerson.phone"] ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors["contactPerson.phone"] && <p className="mt-2 text-sm text-red-600">{errors["contactPerson.phone"]}</p>}
                  </div>
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Adding Resource...
                      </span>
                    ) : (
                      "Add Resource"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddResource;