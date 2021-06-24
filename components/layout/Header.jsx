import React from 'react';
import Link from 'next/link';
import Search from '../ui/Search';
import Navigation from './Navigation';

const Header = () => {
    return ( 
        <header>
            <div>
                <div>
                    <p>P</p>
                    {/* Search */}
                    <Search />

                    {/* Nav */}
                    <Navigation />
                </div>

                <div>
                    {/* Admin menu */}
                    <p>Hola: Juan</p>

                    <button type="button">Log out</button>

                    <Link href="/">Login</Link>
                    <Link href="/d">Create account</Link>
                </div>
            </div>
        </header>
     );
}
 
export default Header;