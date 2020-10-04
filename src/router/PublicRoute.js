import React from 'react'
import { Redirect, Route } from 'react-router-dom'

export const PublicRoute = ({ isAuth, component: Component, ...rest }) => {
    return (
        <Route 
            { ...rest }
            component={ (props) => (
                (isAuth)
                ? <Redirect to="/" />
                : <Component { ...props } />
            )} 
        />
        
    );
}
