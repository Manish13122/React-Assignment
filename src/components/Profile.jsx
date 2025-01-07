import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProfileCard from './ProfileCard';
import EditCard from './EditCard';

const Profile = () => {
  const [users, setUsers] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [selectedUser, setSelectedUser] = useState(null); // For viewing profile
  const [editingUser, setEditingUser] = useState(null); // For editing profile

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const toggleHeartColor = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const openProfile = (user) => {
    setSelectedUser(user);
  };

  const closeProfile = () => {
    setSelectedUser(null);
  };

  const startEditing = (user) => {
    setEditingUser(user);
  };

  const saveEdit = (updatedUser) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setEditingUser(null);
  };

  const cancelEdit = () => {
    setEditingUser(null);
  };

  // Function to delete a user from the list
  const deleteUser = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  if (editingUser) {
    return <EditCard user={editingUser} onSave={saveEdit} onCancel={cancelEdit} />;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        {users.map((user) => (
          <div
            className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
            key={user.id}
            onClick={() => openProfile(user)}
            style={{ cursor: 'pointer' }}
          >
            <div className="card" style={{ width: '100%', height: '100%' }}>
              <div className="image" style={{ width: '100%', height: '200px' }}>
                <img
                  src={`https://avatars.dicebear.com/v2/avataaars/${user.name}.svg?options[mood][]=happy`}
                  className="card-img-top"
                  alt="User Avatar"
                  style={{ width: '100%', height: '180px' }}
                />
              </div>
              <div className="card-body pt-3">
                <h5 className="card-title">{user.name}</h5>
                <div>
                  <p className="text-secondary">
                    <i className="bi bi-envelope"></i> &nbsp;{user.email}
                    <br />
                    <i className="bi bi-telephone"></i>&nbsp; {user.phone}
                    <br />
                    <i className="bi bi-browser-firefox"></i>&nbsp; http://{user.website}
                  </p>
                </div>
                <div className="buttons d-flex justify-content-around px-3 ">
                  <button
                    className="btn"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the `onClick` for the card
                      toggleHeartColor(user.id);
                    }}
                  >
                    <i
                      className={`bi ${
                        favorites[user.id]
                          ? 'bi-heart-fill text-danger'
                          : 'bi-heart text-danger'
                      }`}
                    ></i>
                  </button>
                  <button
                    className="btn text-secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      startEditing(user);
                    }}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="btn text-secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteUser(user.id); // Call delete function
                    }}
                  >
                    <i className="bi bi-trash-fill"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedUser && <ProfileCard user={selectedUser} onClose={closeProfile} />}
    </div>
  );
};

export default Profile;
