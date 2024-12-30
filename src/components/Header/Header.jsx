import React from 'react'
import { Container, Logo, LogoutBtn, Button } from '../index';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Header() {

  console.log(useSelector((state) => state.auth.status));
  const authStatus = useSelector((state) => state.auth.status);

  const navigate = useNavigate();

  //All the possible navbar items, displaying using the attribute active
  const naItems = [
    {
      name: 'Home',
      slug: '/' /* Link to the home page*/,
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    }
  ]
  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'> {/* Remember the to attribute in the Link tag */}
              <Logo width='70px' />
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {naItems.map((item) =>
              item.active ? (
                <li key={item.name}
                >
                  <Button onClick={() => navigate(item.slug)}
                    className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full">
                    {item.name}
                  </Button>
                </li>
              ) : null
            )}
          </ul>
          {/* If the user is logged in only then the LogoutBtn will be visible  */}
          {authStatus && (
            <li>
              <LogoutBtn />
            </li>
          )}
        </nav>
      </Container>
    </header>
  )
}

export default Header