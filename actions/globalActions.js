const openDrawer = _ => ({
    type: 'OPEN_DRAWER',
});

const closeDrawer = _ => ({
    type: 'CLOSE_DRAWER',
});

const toggleDrawer = _ => ({
    type: 'TOGGLE_DRAWER',
});

const loading = isLoading => ({
    type: 'LOADING',
    data: isLoading,
});

export {
    openDrawer,
    closeDrawer,
    toggleDrawer,
    loading,
};
