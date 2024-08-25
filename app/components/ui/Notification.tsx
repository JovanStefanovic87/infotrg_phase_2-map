import React from 'react';

interface NotificationProps {
	message?: string | null;
	type: 'error' | 'success';
}

const Notification: React.FC<NotificationProps> = ({ message, type }) => {
	if (!message) return null;

	const styles = type === 'error' ? 'text-red-500 mb-4' : 'text-green-500 mb-4';

	return <p className={styles}>{message}</p>;
};

export default Notification;
