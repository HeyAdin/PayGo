import {Navigate} from 'react-router-dom'

export function ProtectedRoute({children}){
    const token = localStorage.getItem('token');
    if(!token.length==0){
        return children;
    }
    return <Navigate to={'/signin'}/>;
}