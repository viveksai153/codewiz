import React, { useState } from 'react';
import CommunityService from './CommunityService';
import AppBar from '../AppBar';
import './createnewcommunity.css';

const CreateNewCommunity = () => {
  const [createForm, setCreateForm] = useState({
    name: '',
    description: ''
  });

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await CommunityService.createCommunity(createForm.name, createForm.description);
      alert('Community created successfully!');
      // After creating the community, clear the form fields
      setCreateForm({
        name: '',
        description: ''
      });
      console.log(response)
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message === 'Community name already exists') {
        alert('Community name already exists. Please choose a different name.');
      } else {
        console.error('Error creating community:', error.message);
      }
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreateForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <>
      <AppBar />
      <div className="card">
        <h2>Create New Community</h2>
        <form onSubmit={handleCreateSubmit}>
          <input
            type="text"
            name="name"
            value={createForm.name}
            onChange={handleInputChange}
            placeholder="Community Name"
            required
          />
          <textarea
            name="description"
            value={createForm.description}
            onChange={handleInputChange}
            placeholder="Community Description"
            required
          />
          <button type="submit">Create Community</button>
        </form>
      </div>
    </>
  );
};

export default CreateNewCommunity;
