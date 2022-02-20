const { v4 } = require( 'uuid');

export function generateUniqueID(){
    return v4();
}