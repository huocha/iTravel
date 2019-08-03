const open = (text, type) => ({
    type: 'OPEN',
    data: { text, type },
});

const close = () => ({
    type: 'CLOSE',
});

const loading = isLoading => ({
    type: 'LOADING',
    data: isLoading,
});

export {
    open,
    close,
    loading,
};
