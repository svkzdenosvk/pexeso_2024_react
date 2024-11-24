import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './css/sharedLayout.css';

function SharedLayout() {
  return (
    <div class="shared-content">
      <div class="shared-navigation">        
        <nav>
      
          <NavLink to="/about-game">O Hre</NavLink>   

          <NavLink to="/game">Hraj hru</NavLink>   

        </nav>
      </div>
      <div class="shared-main-content">
        {/* <main>  */}
          <Outlet /> {/* content from nested routes */}
        {/* </main> */}
       </div>         

    </div>
  );
}

export default SharedLayout;
