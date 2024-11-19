const info = (...params: any) => {
    if (process.env.NODE_ENV !== 'test') {
        console.log('[INFO]', ...params);
    }
};

const error = (...params: any) => {
    if (process.env.NODE_ENV !== 'test') {
        console.error('[ERROR]', ...params);
    }
};

const warn = (...params: any[]) => {
    if (process.env.NODE_ENV !== 'test') {
        console.warn('[WARN]', ...params);
    }
};

export { info, error, warn }