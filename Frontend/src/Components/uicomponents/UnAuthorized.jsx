import { Link } from "react-router-dom";
import React from "react";

export function UnAuthorized() {
    return (
        <div className="text-center mt-10">
          <h1 className="text-2xl font-bold mb-4">page non trouvable 😭</h1>
          <p className="mb-4">Vous n'avez pas les permissions nécessaires pour accéder à cette page.</p>
          <Link to="/Signin" className="text-blue-500 hover:text-blue-70">
            Retour à l'accueil
          </Link>
        </div>
      );
}