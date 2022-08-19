import {createContext} from "react";


export const AuthContext = createContext();

return (
    <AuthContext.provider>
        { children }
    </AuthContext.provider>
)