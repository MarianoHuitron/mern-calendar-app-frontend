import { types } from '../../types/types';

describe('Prubas en types', () => {
    
    test('los types deben ser iguales', () => {
        expect( types ).toEqual({
            uiOpenModal: '[UI] Open Modal',
            uiCloseModal: '[UI] Close Modal',
        
        
            eventLogout: '[event] Event Logout',
            eventStartAddNew: '[event] Start add new',
            eventAddNew: '[event] Add New',
            eventSetActive: '[event] Set Active',
            eventClearActiveEvent: '[event] Clear Active Event',
            eventUpdated: '[event] Event Updated',
            eventDeleted: '[event] Event Deleted',
            eventLodaded: '[event] Events loaded',
        
            authCheckingFinish: '[AUTH] Finish Checking login state',
            authStartLogin: '[AUTH] Start Login',
            authLogin: '[AUTH] Login',
            authStartRegister: '[AUTH] Start Register',
            authRegister: '[AUTH] Register',
            authStartTokenRenew: '[AUTH] Start Token Renew',
            authLogout: '[AUTH] Logout',
        })
    })
    

})
