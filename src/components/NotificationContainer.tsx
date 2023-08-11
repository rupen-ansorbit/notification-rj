import React, {
  CSSProperties,
  PropsWithChildren,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';
import {
  Notification,
  NotificationProps,
  NotificationType,
} from './Notification';
import { Correct, Info, Warning, Wrong } from '../images';

const s: { [key: string]: CSSProperties } = {
  app: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '10px',
    padding: '10px',
    position: 'absolute',
  },
  app_top_right: {
    top: 0,
    right: 0,
  },
  app_bottom_right: {
    bottom: 0,
    right: 0,
  },
  app_bottom_left: {
    bottom: 0,
    left: 0,
  },
  app_top_left: {
    top: 0,
    left: 0,
  },
  app_top_center: {
    top: 0,
    left: '50%',
    transform: 'translate(-50%, 0)',
  },
  app_bottom_center: {
    bottom: 0,
    left: '50%',
    transform: 'translate(-50%, 0)',
  },
};

interface NotificationContextType {
  notify: (content: string, type: NotificationType, duration?: number) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);

  const icon = useCallback((type: NotificationType): ReactNode => {
    switch (type) {
      case 'success':
        return <Correct />;
      case 'error':
        return <Wrong />;
      case 'info':
        return <Info />;
      case 'warning':
        return <Warning />;
    }
  }, []);

  const notify = (label: string, type: NotificationType, duration = 3000) => {
    const newNotification: NotificationProps = {
      id: Date.now(),
      label,
      type: type ?? 'success',
      icon,
    };

    setNotifications((prevNotifications) => [
      ...prevNotifications,
      newNotification,
    ]);

    const id = setTimeout(() => {
      closeNotification(newNotification.id);
      clearTimeout(id);
    }, duration ?? 2000);
  };

  const closeNotification = (id: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  const position = 'top_right';

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <div style={{ ...s.app, ...s?.['app_' + position] }}>
        {notifications.map((item) => (
          <Notification id={item.id} label={item.label} type={item.type} />
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider'
    );
  }

  return context;
};
