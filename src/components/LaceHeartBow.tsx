import React from 'react';
import { RealSatinHeartBow, SatinHeartStyle } from './RealSatinHeartBow';

interface LaceHeartBowProps {
  onClick?: () => void;
  defaultStyle?: SatinHeartStyle;
}

export const LaceHeartBow: React.FC<LaceHeartBowProps> = ({
  onClick,
  defaultStyle = 'ivory_satin_gold',
}) => {
  return <RealSatinHeartBow onClick={onClick} defaultStyle={defaultStyle} />;
};
