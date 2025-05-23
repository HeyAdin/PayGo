import { useEffect, useState } from "react";
import { AppBar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { SearchBar } from "../components/SearchBar";
import { Users } from "../components/Users";
import axios from 'axios'
import { motion } from 'framer-motion'

const pageVariants = {
    initial: { opacity: 0, y: 5 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 0 },
};

export function Dashboard() {

    const [balance, setBalance] = useState('')
    const [currentUser, setCurrentUser] = useState("")
    const [allUsers, setAllUsers] = useState([]);
    useEffect(() => {
        axios.get('https://paygo.onrender.com/api/v1/accounts/balance', {
            headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
        }).then((response) => {
            setBalance(response.data.balance);
        });

        axios.get('https://paygo.onrender.com/api/v1/user/my-profile', {
            headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
        }).then((response) => {
            setCurrentUser(response.data.firstName);
        })


        axios.get('https://paygo.onrender.com/api/v1/user/all-user', {
            headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
        }).then((response) => {
            setAllUsers(response.data.friends);
            console.log(response.data.friends)
        })
    }, [])
    return (<motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.3 }}>
        <div className="h-screen w-screen bg-[#0A2B24]">
            <AppBar user={currentUser} />
            <Balance balance={`$${balance}`} />
            <SearchBar />
            <Users allUsers={allUsers} />
        </div>
    </motion.div >
    )
}