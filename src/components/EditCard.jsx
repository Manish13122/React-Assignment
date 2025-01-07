import React, { useState } from 'react';


const EditCard = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({ ...user });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle save action
  const handleSave = () => {
    onSave(formData); // Pass the updated data back to the parent
  };

  return (
    <div className="edit-card-container">
      <h3>Edit User Details</h3>
      <div className="form-group mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          name="email"
          className="form-control"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group mb-3">
        <label className="form-label">Phone</label>
        <input
          type="text"
          name="phone"
          className="form-control"
          value={formData.phone}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group mb-3">
        <label className="form-label">Website</label>
        <input
          type="text"
          name="website"
          className="form-control"
          value={formData.website}
          onChange={handleInputChange}
        />
      </div>
      <div className="button-container">
        <button className="btn-save" onClick={handleSave}>
          Save
        </button>
        <button className="btn-cancel" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditCard;
