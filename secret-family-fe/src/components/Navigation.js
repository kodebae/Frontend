
import React from "react";

function Navigation() {
    return (
      <div className='navigation'>
      
      </div>
    );
  }
  
  export default Navigation;

// //waiting for Karmen

// //placeholder Navigation code

// import React from "react";
// import { NavLink, withRouter } from "react-router-dom";

// const Navigation = ({ history }) => {
//   const signOut = () => {
//     localStorage.removeItem("token");
//     history.push("/log-in");
//   };

//   return (
//     <nav className='nav'>
//       <div className='nav-logo-set'>
//         <p className='nav-title'>Family Secret Recipes</p>
//       </div>
//       <div className='links'>
//         <NavLink to='/'>Home</NavLink>
//         <NavLink to='/add-recipe'>Add New Recipe</NavLink>
//         <button onClick={signOut}>Sign Out</button>
//       </div>
//     </nav>
//   );
// };

// export default withRouter(Navigation);
