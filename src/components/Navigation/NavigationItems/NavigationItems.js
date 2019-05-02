import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

import './NavigationItems.css';

const navigationItems = () => (
    <ul className="navigationItems">
        <NavigationItem link="/" exact>Home</NavigationItem>
        <NavigationItem link="/about">About</NavigationItem>
    </ul>
);

export default navigationItems;
