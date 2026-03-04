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

        <NavLink to="/Login"> התחברות לאתר DREAM </NavLink>
        <NavLink to="/SignUp">הרשמה</NavLink>
      </div>

      <div className="navbar-center">
        {/* <NavLink to="/Home">עמוד הבית</NavLink> */}
        {productLinks}
      </div>

      <div className="navbar-left">
        {admin === "manager" && <NavLink to="/AddProduct">הוספת מוצר</NavLink>}
        {admin === "manager" ? (
          <NavLink to="/Users">רשימת משתמשים</NavLink>
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
