import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Home = () => {
    const users = useLoaderData();
    const [displayUser, setDisplayUser] = useState(users)

    const handleDelete = user => {
        const agree = window.confirm(`Are you sure you want to delete ${user.name}`);
        if (agree) {
            // console.log('deleting user with ', user._id)
            fetch(`http://localhost:5000/users/${user._id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('user deleted successfully');
                        const remainingUsers = displayUser.filter(usr => usr._id !== user._id);
                        setDisplayUser(remainingUsers)
                    }
                })
        }

    }

    return (
        <div>
            <h2>Users : {displayUser.length}</h2>
            <p><Link to='/users/add'>add user</Link></p>
            <p><Link to='/update'>Update user</Link></p>
            <div>
                {
                    displayUser.map(user => <p key={user._id}>
                        {user.name} {user.email}
                        <Link to={`/update/${user._id}`}>
                            <button >update</button>
                        </Link>
                        <button onClick={() => handleDelete(user)}>x</button>
                    </p>)
                }
            </div>
        </div>
    );
};

export default Home;