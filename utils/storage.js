import { AsyncStorage } from 'react-native';

export const userInfos = {
    value: {},
    set: (val) => {
        AsyncStorage.setItem('userInfos', JSON.stringify(val));
        this.value = val;
    },
    get: () => this.value,
    merge: (value) => {
        const merged = { ...this.value, ...value };
        AsyncStorage.setItem('userInfos', JSON.stringify(merged));
        return merged;
    },
};
