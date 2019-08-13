import Toast from 'react-native-root-toast';

export default class PushNotificationsService {

  static handleNotification(notification, navigation) {

    if (notification.data.screen && notification.origin === 'selected') {
      navigation.navigate(notification.data.screen);
    }
    Toast.show(notification.data.message);
  }

}
