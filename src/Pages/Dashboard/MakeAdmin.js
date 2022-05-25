import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading/Loading';
 
import UserRow from './UserRow';

const MakeAdmin = () => {

    const { data: users, isLoading, refetch } = useQuery('users', () => fetch('http://localhost:5000/users', {
        method: 'GET',  
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`  
        }
    }).then(res => res.json()));


    if (isLoading) {
        return <Loading></Loading>
    }


    return (
        <div className='bg-[#677E81] py-10 h-screen px-10'>
             <div class="overflow-x-auto">
                <table class="table w-full">

                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            users.map((user,index) => <UserRow

                                key={user._id}
                                user={user}
                                refetch={refetch}
                                index={index}

                            ></UserRow>)
                        }
                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default MakeAdmin;