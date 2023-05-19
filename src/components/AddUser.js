import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AddUser = () => {
    const [user, setUser] = useState({});

    const handleAddUser = event => {
        event.preventDefault();
        console.log(user)

        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    alert('user added successfully');
                    event.target.reset()
                }
            })
    };
    const handleBlur = event => {
        const field = event.target.name
        const value = event.target.value;
        const newUser = { ...user };
        newUser[field] = value;
        setUser(newUser)
    }

    return (
        <div>
            <Link to='/'><h1>Home</h1></Link>
            <h2>please add a new user</h2>
            <form onSubmit={handleAddUser}>
                <input onBlur={handleBlur} type="text" name="name" required id="" placeholder='name' />
                <br />
                <input onBlur={handleBlur} type="text" name="address" required placeholder='address' id="" />
                <br />
                <input onBlur={handleBlur} type="email" name="email" required placeholder='email' id="" />
                <br />
                <button type="submit">Add user</button>
            </form>

        </div>
    );
};

export default AddUser;