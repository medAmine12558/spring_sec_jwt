import { jwtDecode } from "jwt-decode";
import React from "react";
import { Navigate } from "react-router-dom";


export default function RouteProtected({allowedRoles,children}) {

    function gettokenclaims() {
        return jwtDecode(sessionStorage.getItem("token"));
    }
    function getroles() {
        const tokenclaims=gettokenclaims();
        if(tokenclaims){
            return tokenclaims.roles
        }else{
            return "erreur dans la recuperation des roles"
        }
    }
    function hasAuthority(){
        console.log(allowedRoles.some(role=>getroles().includes(role)))
        return allowedRoles.some(role=>getroles().includes(role))
    }
    if(!hasAuthority()){
        
        return <Navigate to="/UnAuthorized" replace></Navigate>
    }
    return children
}