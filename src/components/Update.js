import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Update = () => {
    const storedUser = useLoaderData();

    const [user, setUser] = useState({ storedUser });

    const handleUpdateUser = event => {
        event.preventDefault();
        // console.log(user)
        fetch(`http://localhost:5000/users/${storedUser._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('user updated successfully')
                }
            })


    };
    const handleInputChange = event => {
        const field = event.target.name
        const value = event.target.value;
        const newUser = { ...user };
        newUser[field] = value;
        setUser(newUser)
    }
    return (
        <div>
            <Link to='/'><h1>Home</h1></Link>
            <h2>Please Update: {storedUser.name} </h2>
            <form onSubmit={handleUpdateUser}>
                <input onChange={handleInputChange} defaultValue={storedUser.name} type="text" name="name" required id="" placeholder='name' />
                <br />
                <input onChange={handleInputChange} defaultValue={storedUser.address} type="text" name="address" required placeholder='address' id="" />
                <br />
                <input onChange={handleInputChange} defaultValue={storedUser.email} readOnly type="email" name="email" required placeholder='email' id="" />
                <br />
                <button type="submit">update user</button>
            </form>
        </div>
    );
};

export default Update;