import React from 'react';
import { NavigationContainerRef, ParamListBase } from '@react-navigation/native';

export const navigationRef = React.createRef<NavigationContainerRef<ParamListBase>>();

export const navigate = (name: keyof ParamListBase, params?: ParamListBase[keyof ParamListBase]) => {
  navigationRef.current?.navigate(name, params);
};
