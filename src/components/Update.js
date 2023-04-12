import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Update = () => {
    const storedUser = useLoaderData();
    const [user, setUser] = useState(storedUser);

    const handleUpdate = event => {
        event.preventDefault();
        // console.log(user)
        fetch(`http://localhost:5000/users/${storedUser._id}`, {
            method: 'PUT',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0)
                    alert('user updated')
            })
    }

    const handleChange = event => {
        const field = event.target.name;
        const value = event.target.value;
        const newUser = { ...user };
        newUser[field] = value;
        setUser(newUser)
    }

    return (
        <div>
            <Link to='/'><h1>Home</h1></Link>
            <h1>please update :{storedUser.name}</h1>
            <form onSubmit={handleUpdate}>
                <input onChange={handleChange} defaultValue={storedUser.name} type="text" name="name" placeholder='name' id="" required />
                <br />
                <input onChange={handleChange} defaultValue={storedUser.address} type="text" name="address" placeholder='address' id="" required />
                <br />
                <input onChange={handleChange} defaultValue={storedUser.email} type="email" name="email" placeholder='email' id="" required />
                <br />
                <button type="submit">update user</button>
            </form>
        </div>
    );
};

export default Update;