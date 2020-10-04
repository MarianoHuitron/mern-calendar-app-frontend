import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';
import '@testing-library/jest-dom';
import { startChecking, startLogin, startLogout, startRegister } from '../../actions/auth';
import { types } from '../../types/types';
import * as fetchModule  from '../../helpers/fetch';



jest.mock('sweetalert2', () => ({
    _esModule: true,
    fire: jest.fn()
}));


const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initState = {};
let store = mockStore(initState);

Storage.prototype.setItem = jest.fn();
Storage.prototype.clear = jest.fn();

let token = '';

describe('Pruebas en las acciones Auth', () => {
    
    beforeEach(() => {
        store = mockStore( initState );
        jest.clearAllMocks();
    });

    test('startLogin correcto', async () => {
        await store.dispatch( startLogin('test@test.com', '123456') );
        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.authLogin,
            payload: {
                uid: expect.any(String),
                name: expect.any(String)
            }
        });

        expect( localStorage.setItem ).toHaveBeenCalledWith('token', expect.any(String));
        expect( localStorage.setItem ).toHaveBeenCalledWith('token-init-date', expect.any(Number));
        
        token = localStorage.setItem.mock.calls[0][1];
        // console.log(token)
    });

    test('startLogin incorrecto', async () => {
        await store.dispatch( startLogin('test@test.comError', '123456') );
        const actions = store.getActions();

        expect(actions).toEqual([]);
        expect( Swal.fire ).toHaveBeenCalledWith('Error', 'Usuario o contraseña no coinciden', 'error');

    });


    test('startRegister Correcto ', async () => {

        fetchModule.fetchSinToken = jest.fn(() => ({
            json() {
                return {
                    ok: true,
                    uid: '123',
                    name: 'Carlos',
                    token: 'ajdj39sm2343'
                }
            }
        }));

        await store.dispatch( startRegister('test2@test.com', '123456', 'test') );
        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'Carlos'
            }
        });

        expect( localStorage.setItem ).toHaveBeenCalledWith('token', 'ajdj39sm2343');
        expect( localStorage.setItem ).toHaveBeenCalledWith('token-init-date', expect.any(Number));
    });


    test('startChecking correcto', async () => {

        fetchModule.fetchConToken = jest.fn(() => ({
            json() {
                return {
                    ok: true,
                    uid: '123',
                    name: 'Carlos',
                    token: 'ajdj39sm2343'
                }
            }
        }));

        await store.dispatch( startChecking() );
        const actions = store.getActions();
        
        expect( actions[0] ).toEqual({
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'Carlos'
            }
        });

        expect( localStorage.setItem ).toHaveBeenCalledWith('token', 'ajdj39sm2343');
        expect( localStorage.setItem ).toHaveBeenCalledWith('token-init-date', expect.any(Number));

    });
    
    test('startLogout correcto', async () => {
        await store.dispatch( startLogout() );
        const actions = store.getActions();
        
        expect( actions[0] ).toEqual({
            type: types.authLogout
        });

        expect( localStorage.clear ).toHaveBeenCalled();
    }); 
    
    
    

});
