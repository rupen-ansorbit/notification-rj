import React, { CSSProperties, FC } from 'react';
import { Correct } from '../images';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

const s: { [key: string]: CSSProperties } = {
  notification: {
    background: '#fff',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
    borderRadius: ' 3px',
    padding: ' 10px 16px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: ' center',
    gap: '8px',
  },
  notification__text: {
    fontSize: '13px',
    color: 'rgba(55, 55, 55, 0.688)',
  },
};

export interface NotificationProps {
  id: number;
  label: string;
  type: NotificationType;
  icon?: any;
}

export const Notification: FC<NotificationProps> = ({ icon, label }) => (
  <div style={s.notification}>
    {icon}
    <Correct />
    <div style={s.notification__text}>{label}</div>
  </div>
);
