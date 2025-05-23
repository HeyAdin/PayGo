import {Navigate} from 'react-router-dom'

export function ProtectedRoute({children}){
    const token = localStorage.getItem('token');
    if(token!==null){
        return children;
    }
    return <Navigate to={'/signin'}/>;
}