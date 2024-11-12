import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    contact: "",
    gender: "",
    age: "",
    dob: "",
    country: "",
    address: "",
  });

  const [submittedData, setSubmittedData] = useState([]);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/submit", formData);
      fetchData();
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        contact: "",
        gender: "",
        age: "",
        dob: "",
        country: "",
        address: "",
      });
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  // Fetch all submitted data
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/data");
      setSubmittedData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="container">
        <h1>Form In React</h1>
        <form onSubmit={handleSubmit}>
          <label className="form-label">First Name*</label>
          <input
            type="text"
            className="form-control"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="Enter your First Name"
          />
          <label className="form-label">Last Name*</label>
          <input
            type="text"
            className="form-control"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="Enter your Last Name"
          />
          <label className="form-label">Email*</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
          <label className="form-label">Password*</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your Password"
            required
            minLength="8"
          />
          <label className="form-label">Contact*</label>
          <input
            type="tel"
            className="form-control"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Enter contact number"
          />
          <label className="form-label">Gender*</label>
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={formData.gender === "Male"}
            onChange={handleChange}
          />{" "}
          Male
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={formData.gender === "Female"}
            onChange={handleChange}
          />{" "}
          Female
          <input
            type="radio"
            name="gender"
            value="Other"
            checked={formData.gender === "Other"}
            onChange={handleChange}
          />{" "}
          Other
          <label className="form-label">Age (optional)</label>
          <input
            type="number"
            className="form-control"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter your age"
          />
          <label className="form-label">Date of Birth*</label>
          <input
            type="date"
            className="form-control"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
          <label className="form-label">Country*</label>
          <input
            type="text"
            className="form-control"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Enter your Country"
          />
          <label className="form-label">Address*</label>
          <textarea
            className="form-control"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Add your Address"
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="card mt-3" id="table" style={{ width: "100%" }}>
        <div className="card-header bg-success text-white">Submitted Data</div>
        <div className="card-body">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Gender</th>
                <th>Age</th>
                <th>DOB</th>
                <th>Country</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {submittedData.map((data, index) => (
                <tr key={index}>
                  <td>{data.firstname}</td>
                  <td>{data.lastname}</td>
                  <td>{data.email}</td>
                  <td>{data.contact}</td>
                  <td>{data.gender}</td>
                  <td>{data.age}</td>
                  <td>{data.dob}</td>
                  <td>{data.country}</td>
                  <td>{data.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;









//copy code from https://github.com/
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./App.css";

// function App() {
//   const [formData, setFormData] = useState({
//     firstname: "",
//     lastname: "",
//     email: "",
//     password: "",
//     contact: "",
//     gender: "",
//     age: "",
//     dob: "",
//     country: "",
//     address: "",
//   });
//   const [submittedData, setSubmittedData] = useState([]);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentId, setCurrentId] = useState(null);

//   useEffect(() => {
//     // Fetch all data on component load
//     axios
//       .get("http://localhost:7000/data")
//       .then((res) => setSubmittedData(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   // Handle form field change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Submit form data
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (isEditing) {
//       // Edit mode: Update existing data
//       axios
//         .put(`http://localhost:7000/submit/${currentId}`, formData)
//         .then((res) => {
//           setSubmittedData((prevData) =>
//             prevData.map((item) => (item._id === currentId ? res.data : item))
//           );
//           setIsEditing(false);
//           setCurrentId(null);
//           setFormData({
//             firstname: "",
//             lastname: "",
//             email: "",
//             password: "",
//             contact: "",
//             gender: "",
//             age: "",
//             dob: "",
//             country: "",
//             address: "",
//           });
//         });
//     } else {
//       // New submission
//       axios
//         .post("http://localhost:7000/submit", formData)
//         .then((res) => setSubmittedData([...submittedData, res.data]));
//     }
//   };

//   // Load data into form for editing
//   const handleEdit = (id) => {
//     const editData = submittedData.find((item) => item._id === id);
//     setFormData(editData);
//     setIsEditing(true);
//     setCurrentId(id);
//   };

//   // Delete row data
//   const handleDelete = (id) => {
//     axios
//       .delete(`http://localhost:7000/submit/${id}`)
//       .then(() =>
//         setSubmittedData(submittedData.filter((item) => item._id !== id))
//       );
//   };

//   return (
//     <>
//       <div className="container">
//         <h1>Form In React</h1>
//         <form onSubmit={handleSubmit}>
//           {/* Form fields */}
//           <label>First Name*</label>
//           <input
//             type="text"
//             name="firstname"
//             value={formData.firstname}
//             onChange={handleChange}
//           />
//           <label>Last Name*</label>
//           <input
//             type="text"
//             name="lastname"
//             value={formData.lastname}
//             onChange={handleChange}
//           />
//           <label>Email*</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//           />
//           <label>Password*</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             minLength="8"
//           />
//           <label>Contact*</label>
//           <input
//             type="tel"
//             name="contact"
//             value={formData.contact}
//             onChange={handleChange}
//           />
//           <label>Gender*</label>
//           <input
//             type="radio"
//             name="gender"
//             value="Male"
//             onChange={handleChange}
//             checked={formData.gender === "Male"}
//           />{" "}
//           Male
//           <input
//             type="radio"
//             name="gender"
//             value="Female"
//             onChange={handleChange}
//             checked={formData.gender === "Female"}
//           />{" "}
//           Female
//           <input
//             type="radio"
//             name="gender"
//             value="Other"
//             onChange={handleChange}
//             checked={formData.gender === "Other"}
//           />{" "}
//           Other
//           <label>Age (optional)</label>
//           <input
//             type="number"
//             name="age"
//             value={formData.age}
//             onChange={handleChange}
//           />
//           <label>Date of Birth*</label>
//           <input
//             type="date"
//             name="dob"
//             value={formData.dob}
//             onChange={handleChange}
//           />
//           <label>Country*</label>
//           <input
//             type="text"
//             name="country"
//             value={formData.country}
//             onChange={handleChange}
//           />
//           <label>Address*</label>
//           <textarea
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//           />
//           <button type="submit">{isEditing ? "Update" : "Submit"}</button>
//         </form>

//         {/* Display data table */}
//       </div>
//       <div className="card" id="table" style={{ width: "100%" }}>
//         <div className="card-header bg-success text-white">Submitted Data</div>
//         <div className="card-body">
//           <table className="table table-bordered">
//             <thead>
//               <tr>
//                 <th>First Name</th>
//                 <th>Last Name</th>
//                 <th>Email</th>
//                 <th>Contact</th>
//                 <th>Gender</th>
//                 <th>Age</th>
//                 <th>DOB</th>
//                 <th>Country</th>
//                 <th>Address</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {submittedData.map((data) => (
//                 <tr key={data._id}>
//                   <td>{data.firstname}</td>
//                   <td>{data.lastname}</td>
//                   <td>{data.email}</td>
//                   <td>{data.contact}</td>
//                   <td>{data.gender}</td>
//                   <td>{data.age}</td>
//                   <td>{data.dob}</td>
//                   <td>{data.country}</td>
//                   <td>{data.address}</td>
//                   <td>
//                     <button onClick={() => handleEdit(data._id)}>Edit</button>
//                     <button onClick={() => handleDelete(data._id)}>
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;
