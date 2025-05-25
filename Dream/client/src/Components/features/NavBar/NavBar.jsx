// // import React, { useEffect } from 'react';
// // import {Link} from 'react-router-dom'
// // import './NavBar.css'
// // import { useSelector } from 'react-redux';
// // import LogoutIcon from '@mui/icons-material/Logout';
// // import { useLocation, useNavigate } from 'react-router-dom'; // הוספה חשובה בראש


// // // import LogoutIcon from '@mui/icons/-material/Logout'
// // const NavBar = () => {

// //     const admin = useSelector((s)=> s.user.admin);
// //     console.log(admin);
// //     const logout=()=>{
// //       alert("logout")

// //       window.location.reload();
// //     }
// //      const location = useLocation();
// //     const navigate = useNavigate();
// //  useEffect(() => {
// //         if (performance.navigation.type === 1 && location.pathname !== '/Home') {
// //             navigate('/Home', { replace: true });
// //         }
// //     }, []);

// //     return ( 
// //         <> 
// //         {admin==="manager" &&(
// //             <ul>

// //             <li><Link to="Home">עמוד הבית</Link></li>
// //             <li><Link to="Login">התחברות</Link></li>
// //             <li><Link to="AddProduct">הוספת מוצר</Link></li>
// //             <li><Link to="Users">משתמשים</Link></li>
// //             {/* <li><Link to="About">אודות</Link></li> */}
// //             {/* <li><Link to="Contact">צור קשר</Link></li> */}
// //             <li><Link to="ProductShow/טקטורונים">טרקטרונים</Link></li>
// //             <li><Link to="ProductShow/אופניים">אופנים</Link></li>
// //             <li><Link to="ProductShow/קורקינטים">קורקינט</Link></li>
// //             <li><Link to="ProductShow/באגי">באגי</Link></li>
// //             <li><Link to="ProductShow/רייזר">רייזר</Link></li>
// //            <li> <Link to="ProductShow/גיפים">גיפים</Link></li>
// //             <LogoutIcon onClick={()=>logout()}></LogoutIcon>
// //          </ul>
// //         )}
// //         {(admin==="user" || (admin === "" || admin === undefined || admin === null)) &&(
// //             <ul>
// //             <li><Link to="Home">עמוד הבית</Link></li>
// //             <li><Link to="Login">התחברות</Link></li>
// //             <li><Link to="SignUp">לרשמה</Link></li>
// //             <li><Link to="About">אודות</Link></li>
// //             <li><Link to="Contact">צור קשר</Link></li>
// //             {(admin==="user") &&<li><Link to="AddToCart/id">cart</Link></li>}
// //             <li><Link to="ProductShow/טקטורונים">טרקטרונים</Link></li>
// //             <li><Link to="ProductShow/אופניים">אופנים</Link></li>
// //             <li><Link to="ProductShow/קורקינטים">קורקינט</Link></li>
// //             <li><Link to="ProductShow/באגי">באגי</Link></li>
// //             <li><Link to="ProductShow/רייזר">רנגר</Link></li>
// //            <li> <Link to="ProductShow/גיפים">גיפים</Link></li>
// //            {(admin==="user") &&<LogoutIcon onClick={()=>logout()}></LogoutIcon>}
// //          </ul>
// //         )}
// //           </> 

// // );
// // }
// // export default NavBar;
// import React, { useEffect } from 'react';
// import { NavLink, useLocation, useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import LogoutIcon from '@mui/icons-material/Logout';
// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

// import './NavBar.css';

// const NavBar = () => {
//   const admin = useSelector((s) => s.user.admin);
//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (performance.navigation.type === 1 && location.pathname !== '/Home') {
//       navigate('/Home', { replace: true });
//     }
//   }, []);

//   const logout = () => {
//     alert("התנתקת מהמערכת");
//     window.location.reload();
//   };

//   const managerLinks = (
//     <>
//       <NavLink to="/Home">עמוד הבית</NavLink>
//       <NavLink to="/Login">התחברות</NavLink>
//       <NavLink to="/AddProduct">הוספת מוצר</NavLink>
//       <NavLink to="/Users">משתמשים</NavLink>
//       <NavLink to="/ProductShow/טקטורונים">טרקטורונים</NavLink>
//       <NavLink to="/ProductShow/אופניים">אופניים</NavLink>
//       <NavLink to="/ProductShow/קורקינטים">קורקינטים</NavLink>
//       <NavLink to="/ProductShow/באגי">באגי</NavLink>
//       <NavLink to="/ProductShow/רייזר">רייזר</NavLink>
//       <NavLink to="/ProductShow/גיפים">ג'יפים</NavLink>
//       <LogoutIcon className="logout-icon" onClick={logout} />
//     </>
//   );

//   const userLinks = (
//     <>
//       <NavLink to="/Home">עמוד הבית</NavLink>
//       <NavLink to="/Login">התחברות</NavLink>
//       <NavLink to="/SignUp">הרשמה</NavLink>
//       <NavLink to="/About">אודות</NavLink>
//       <NavLink to="/Contact">צור קשר</NavLink>
//       {admin === "user" && (
//         <NavLink to="/AddToCart/id" style={{ display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none', color: 'inherit' }}>
//           <AddShoppingCartIcon />
//           <span>cart</span>
//         </NavLink>
//       )}      <NavLink to="/ProductShow/טקטורונים">טרקטורונים</NavLink>
//       <NavLink to="/ProductShow/אופניים">אופניים</NavLink>
//       <NavLink to="/ProductShow/קורקינטים">קורקינטים</NavLink>
//       <NavLink to="/ProductShow/באגי">באגי</NavLink>
//       <NavLink to="/ProductShow/רייזר">ריינג'ר</NavLink>
//       <NavLink to="/ProductShow/גיפים">ג'יפים</NavLink>
//       {admin === "user" && <LogoutIcon className="logout-icon" onClick={logout} />}
//     </>
//   );

//   return (
//     <nav className="navbar">
//       {/* <p className="logo">✨ LumiLux</p> */}
//       <ul className="navbar-list">
//         {(admin === "manager") ? managerLinks : userLinks}
//       </ul>
//     </nav>
//   );
// };

// export default NavBar;

import React, { useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import './NavBar.css';
import { set } from 'store';
import { setAdmin, setIdAdmin } from '../Login/LoginSlice';
import myImage from '../Product/ComponnentsNavBar/Images/logo.png';

const NavBar = () => {
  // const admin = useSelector((s) => s.user.admin);
  const idAdmin = JSON.parse(localStorage.getItem("idAdmin"))
  const admin = useSelector((s) => s.user?.admin || '')
  const location = useLocation();
  const navigate = useNavigate();
  const dis = useDispatch()

  useEffect(() => {
    const idAdmin = JSON.parse(localStorage.getItem("idAdmin"));
    if (idAdmin) {
      dis(setAdmin(idAdmin === 1 ? "manager" : "user"));
    } else {
      dis(setAdmin(""));
    }
    dis(setIdAdmin(idAdmin))
  }, []);

  const logout = () => {
    alert("התנתקת מהמערכת");
    dis(setAdmin(""));
    localStorage.removeItem("idAdmin");
    navigate("/Home"); // או לכל עמוד שתבחרי
  };

  const productLinks = (
    <>
      <NavLink to="/ProductShow/BeddingSleep">BeddingSleep</NavLink>
      <NavLink to="/ProductShow/BeddingYouth">BeddingYouth</NavLink>
      <NavLink to="/ProductShow/BeddingChildren">BeddingChinldren</NavLink>
      <NavLink to="/ProductShow/BeddingTransit">BeddingTransit</NavLink>
    </>
  );

  return (
    <nav className="navbar">
      <div className="navbar-right">
        <div className="logout-placeholder">
          {admin && <LogoutIcon className="logout-icon" onClick={logout} />}
        </div>
        <NavLink to="/Home"><img src={myImage} alt="לוגו" className="navbar-logo" /></NavLink>

        <NavLink to="/Login">התחברות</NavLink>
        <NavLink to="/SignUp">הרשמה</NavLink>
      </div>

      <div className="navbar-center">
        {/* <NavLink to="/Home">עמוד הבית</NavLink> */}
        {productLinks}
      </div>

      <div className="navbar-left">
        {admin === "manager" && <NavLink to="/AddProduct">הוספת מוצר</NavLink>}
        {admin === "manager" ? (
          <NavLink to="/Users">משתמשים</NavLink>
        ) : admin === "user" ? (
          <>
            <NavLink
              to="/AddToCart/id"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <AddShoppingCartIcon />
              <span>עגלה</span>
            </NavLink>
            <NavLink to="/OrderHistory">היסטוריית הזמנות</NavLink>
          </>

        ) : null}
      </div>
    </nav>
  );
};

export default NavBar;
