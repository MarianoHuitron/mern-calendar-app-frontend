const { authReducer } = require("../../reducers/authReducer");
const { types } = require("../../types/types");

const initState = {
    checking: true
};

describe('pruebas en authReducer', () => {
    
    test('debe de retornar el estado inicial', () => {
        const state = authReducer(initState, {});
        expect( state ).toEqual(initState);     
    });

    test('debe de realizar login y logout ', () => {
        
        const state = authReducer(initState, {
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'Mariano'
            }
        });

        expect( state ).toEqual({ checking: false, uid: '123', name: 'Mariano' })

        const stateLogout = authReducer(state, {type: types.authLogout});
        expect( stateLogout ).toEqual({checking: false});
    })
    
    

})
