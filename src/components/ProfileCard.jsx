import React from 'react';

const ProfileCard = ({ user, onClose }) => {
  return (
    <div className="profile-card-overlay" onClick={onClose}>
      <div
        className="profile-card"
        onClick={(e) => e.stopPropagation()} // Prevent overlay click from closing
      >
        <div className="profile-card-header">
          <h2>{user.name}</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="profile-card-body">
          <img
            src={`https://avatars.dicebear.com/v2/avataaars/${user.name}.svg?options[mood][]=happy`}
            alt="User Avatar"
            className="profile-card-avatar"
          />
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
          <p>
            <strong>Website:</strong> {user.website}
          </p>
          <p>
            <strong>Company:</strong> {user.company?.name || 'N/A'}
          </p>
          <p>
            <strong>Address:</strong>{' '}
            {user.address
              ? `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`
              : 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
