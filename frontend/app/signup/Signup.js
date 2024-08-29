"use client"; // Marks this component as a Client Component, allowing the use of React hooks

import {useState } from 'react'; // Import useState hook from React
import '../../styles/Signup.css'; // Import custom styles for the Signup component

// Signup component definition
const Signup = () => {
  // Initialize state with useState hook
  const [formData, setFormData] = useState({
    name: '',           // Holds the user's name
    email: '',          // Holds the user's email
    jobPosition: '',    // Holds the desired job position
    resume: null,       // Holds the uploaded resume file
  });

  // Handle input change for text fields (name, email, job position)
  const handleChange = (e) => {
    const { name, value } = e.target; // Extract the name and value from the event target
    setFormData({ ...formData, [name]: value }); // Update the state with the new value
  };

  // Handle file input change for the resume
  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] }); // Update the state with the selected file
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const formDataToSend = new FormData(); // Create a new FormData object to send the form data
    formDataToSend.append('name', formData.name); // Append the user's name to the form data
    formDataToSend.append('email', formData.email); // Append the user's email to the form data
    formDataToSend.append('jobPosition', formData.jobPosition); // Append the desired job position to the form data
    formDataToSend.append('resume', formData.resume); // Append the resume file to the form data

    try {
      // Send a POST request to the backend with the form data
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        body: formDataToSend, // Attach the form data to the request body
      });

      if (!response.ok) {
        throw new Error('Network response was not ok'); // Throw an error if the response is not OK
      }

      const data = await response.json(); // Parse the response data
      alert('Form submitted successfully'); // Show an alert on successful submission
      console.log(data); // Log the response data to the console
    } catch (error) {
      alert('Error submitting form'); // Show an alert on error
      console.error('Error:', error); // Log the error to the console
    }
  };

  // Render the Signup form
  return (
    <div>
      <h1 className="heading">Upload Resume</h1> {/* Form heading */}
      <form className="form-container" onSubmit={handleSubmit}>
        <input
          className="input-field"
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange} // Handle name input change
        />
        <input
          className="input-field"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange} // Handle email input change
        />
        <input
          className="input-field"
          type="text"
          name="jobPosition"
          placeholder="Job Position" // Placeholder for job position input
          onChange={handleChange} // Handle job position input change
        />
        <input
          className="input-field"
          type="file"
          name="resume"
          onChange={handleFileChange} // Handle file input change
        />
        <button className="button" type="submit">Submit</button> {/* Submit button */}
      </form>
    </div>
  );
};

export default Signup; // Export the Signup component for use in other parts of the application
