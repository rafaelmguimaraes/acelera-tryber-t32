import app from './app';

const server = app.listen(3000, () => { 
    // eslint-disable-next-line no-console
    console.log('Server is running'); 
});

export default server;
