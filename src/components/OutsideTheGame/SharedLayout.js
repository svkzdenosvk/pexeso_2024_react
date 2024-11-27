import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './css/sharedLayout.css';

function SharedLayout() {
  return (
    <div className="shared-content">
      <div className="shared-navigation">        
        <nav>
      
          <NavLink to="/about-game">O Hre</NavLink>   

          <NavLink to="/settings">Hraj hru</NavLink>   

        </nav>
      </div>
      <div className="shared-main-content">
        {/* <main>  */}
          <Outlet /> {/* content from nested routes */}
        {/* </main> */}
       </div>         

    </div>
  );
}

export default SharedLayout;
