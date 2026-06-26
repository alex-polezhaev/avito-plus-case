import React from 'react';
import { Routes, Route } from 'react-router-dom';
import routes from './router';
import { Box } from '@chakra-ui/react';
export const App = () => {
  return (
    <Box>
      <Routes>
        {routes.map((routes, index) => {
          const { path, component: Component } = routes;
          return <Route key={index} path={path} element={<Component />} />;
        })}
      </Routes>
    </Box>
  );
};
