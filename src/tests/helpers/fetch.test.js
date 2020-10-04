const { fetchSinToken, fetchConToken } = require("../../helpers/fetch")


describe('Pruebas en fetch', () => {
    
    let token = '';

    test('fetchSinToken debe de funcionar', async () => {
        
        const resp = await fetchSinToken('auth', {email: 'test@test.com', password: '123456' }, 'POST');
        expect( resp instanceof Response ).toBe(true);
        
        const body = await resp.json();
        expect( body.ok ).toBe(true);

        token = body.token;
    });

    test('fetchConToken debe de funcionar', async () => {
        localStorage.setItem('token', token);

        const resp = await fetchConToken('events/5f76b1492f6e5f4e285f3267', {}, 'DELETE'); 
        const body = await resp.json();
        
        expect( body.msg ).toBe('Evento inexistente');
        
    });

});
