import React from 'react';
import { Link } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  bottomNav: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 100,
  },
}));

export default function NavigationTabs({ tabs, value }) {
  const cls = useStyles();
  return (
    <BottomNavigation showLabels value={value} className={cls.bottomNav}>
      {tabs.map(([label, { path, icon }]) => (
        <BottomNavigationAction
          component={Link}
          key={`${label}-${path}`}
          label={label}
          value={path}
          icon={icon}
          to={path}
        />
      ))}
    </BottomNavigation>
  );
}
