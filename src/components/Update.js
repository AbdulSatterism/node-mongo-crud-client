import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Update = () => {
    const storedUser = useLoaderData();
    const [user, setUser] = useState(storedUser);

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
                if (data.matchedCount > 0) {
                    alert('user updated');

                }
                console.log(data)
            })
    };

    const handleInputChange = event => {
        const field = event.target.name;
        const value = event.target.value;
        const newUser = { ...user };
        newUser[field] = value;
        setUser(newUser)
    }

    return (
        <div>
            <h2>See member go to :<Link to='/'>Home</Link> </h2>
            <h3>Please update: {storedUser.name}</h3>
            <form onSubmit={handleUpdateUser}>
                <input onChange={handleInputChange} defaultValue={storedUser.name} type="text" name="name" placeholder='Name' required />
                <br />
                <input onChange={handleInputChange} defaultValue={storedUser.address} type="text" name="address" placeholder='address' required />
                <br />
                <input onChange={handleInputChange} defaultValue={storedUser.email} type="email" name="email" placeholder='Email' required />
                <br />
                <button type="submit">update user</button>
            </form>
        </div>
    );
};

export default Update;