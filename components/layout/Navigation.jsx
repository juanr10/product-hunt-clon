import React from 'react';
import Link from 'next/link';

const Navigation = () => {
    return ( 
        <nav>
            <Link href="/">Home</Link>
            <Link href="/">Populars</Link>
            <Link href="/">New Product</Link>
        </nav>
     );
}
 
export default Navigation;