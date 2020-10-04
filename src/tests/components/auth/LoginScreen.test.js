import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { LoginScreen } from '../../../components/auth/LoginScreen';
import { startLogin, startRegister } from '../../../actions/auth';
import Swal from 'sweetalert2';

jest.mock('sweetalert2', () => ({
    _esModule: true,
    fire: jest.fn() 
}));

jest.mock('../../../actions/auth', () => ({
    _esModule: true,
    startLogin: jest.fn(),
    startRegister: jest.fn()
}))

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initState = {};
const store = mockStore(initState);
store.dispatch = jest.fn();


const wrapper = mount(
    <Provider store={ store } >
        <LoginScreen />
    </Provider>
)

describe('Pruebas en <LoginScreen />', () => {

    beforeEach(() => {
        jest.clearAllMocks()
    })
    
    test('debe de mostrarse correctamente', () => {
        
        expect( wrapper ).toMatchSnapshot();

    })
    
    test('debe de llamar al dispatch del login', () => {
        
        wrapper.find('input[name="lEmail"]').simulate('change', {
            target: {
                name: 'lEmail',
                value: 'test@test.com'
            }
        });
        wrapper.find('input[name="lPassword"]').simulate('change', {
            target: {
                name: 'lPassword',
                value: '123456'
            }
        });

        wrapper.find('form').at(0).prop('onSubmit')({
            preventDefault(){}
        });

        expect( startLogin ).toHaveBeenCalledWith('test@test.com', '123456')

    });

    test('no hay registro si las contrasenias son diferentes', () => {
        
        wrapper.find('input[name="rPassword1"]').simulate('change', {
            target: {
                name: 'rPassword1',
                value: '12345'
            }
        });
        wrapper.find('input[name="rPassword2"]').simulate('change', {
            target: {
                name: 'rPassword2',
                value: '123456'
            }
        });

        
        wrapper.find('form').at(1).prop('onSubmit')({
            preventDefault(){}
        });

        expect( startRegister ).not.toHaveBeenCalled();
        expect( Swal.fire ).toHaveBeenCalledWith('Error', 'Las contraseñas no coinciden', 'error');

    });


    test('Registro con contrasenia iguales', () => {
        wrapper.find('input[name="rPassword1"]').simulate('change', {
            target: {
                name: 'rPassword1',
                value: '123456'
            }
        });
        wrapper.find('input[name="rPassword2"]').simulate('change', {
            target: {
                name: 'rPassword2',
                value: '123456'
            }
        });

        
        wrapper.find('form').at(1).prop('onSubmit')({
            preventDefault(){}
        });

        expect( Swal.fire ).not.toHaveBeenCalled()
        expect( startRegister ).toHaveBeenCalledWith("liz@gmail.com", "123456", "Liz");
    })
    
    
    

})

