import React from 'react'

export default function Greeting(props) {
  return (
    <div className="container">
       <table>
        
          <tr>
            <th>Name</th>
            <td>{props.name}</td>
          </tr>
          <tr>
            <th>Age</th>
            <td>{props.age}</td>
          </tr>
          <tr>
            <th>City</th>
            <td>{props.city}</td>
          </tr>
          <tr>
            <th>Qualification</th>
            <td>{props.qualification}</td>
          </tr>
          <tr>
            <th>Experience</th>
            <td>{props.experience}</td>
          </tr>
          <tr>
            <th>PhoneNo</th>
            <td>{props.phoneNo}</td>
          </tr>
          <tr>
            <th>email</th>
            <td>{props.email}</td>
          </tr>
          
        </table>
      



    </div>
  );
};


