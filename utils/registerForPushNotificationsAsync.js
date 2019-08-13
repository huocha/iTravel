import { Permissions, Notifications } from 'expo';

export const hasAlreadyNotificationPermission = async () => {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (existingStatus !== 'granted') {
        return false;
    }
    return true;
};

export const registerForPushNotificationsAsync = async () => {
    const isGranted = await hasAlreadyNotificationPermission();
    if (!isGranted) {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        if (status !== 'granted') {
            return false;
        }
    }
    return Notifications.getExpoPushTokenAsync();
};
