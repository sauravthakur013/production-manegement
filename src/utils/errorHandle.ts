export const errorHandle = (error: any) : string => {
    if(error.includes('E11000')) {
        if (error.includes('email')) {
            return 'Email already exists';
        }else if (error.includes('username')) {
            return 'Username already exists';
        }
    }
    return error;
};