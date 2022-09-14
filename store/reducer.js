import { BOOK_PAGE_STATUS, FETCH_DOCTORS, FETCH_USER, FETCH_DOCTORS_BY_TOWN, CURRENT_USER, SIGN_OUT_USER,FETCH_APPOINTMENTS, ADD_TO_FAVOURITES, REMOVE_FROM_FAVOURITES } from "./actions";

const initialState = {
    bookStatus: false,
    doctors: [],
    townDoctors: [],
    appointments: [],
    currentUserDetails: {},
    socket:null,
    favouritesCallback: false
}
export const fetchCurrentUserReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_USER:
            return{
                ...state, currentUserDetails: action.user, socket:action.socket
            }
        case SIGN_OUT_USER:
            return{
                ...state, currentUserDetails: initialState.currentUserDetails
            }
        case ADD_TO_FAVOURITES:
            return{
                ...state, currentUserDetails: action.updatedUser
            }
        case REMOVE_FROM_FAVOURITES: 
            return{
                ...state, currentUserDetails: action.updatedUser
            }
        default:
            break;
    }
    return state
}
export const fetchDoctorsReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_DOCTORS:
            return {
                ...state, doctors: action.doctors
            }

        case FETCH_DOCTORS_BY_TOWN: 
            return {
                ...state, townDoctors: state.doctors.filter(doctor => doctor.town === action.search ) 
            }
        default:
            break;
    }
    return state
}

export const bookStatusReducer = (state=initialState, action) => {
    switch(action.type){
        case BOOK_PAGE_STATUS:
            return{
                ...state, bookStatus: action.bookStatus
            }
        default:
            break;
    }
    return state
}

export const fetchAppointmentsReducer = (state=initialState, action) => {
    switch(action.type){
        case FETCH_APPOINTMENTS:
            return{
                ...state, appointments: action.appointments
            }
        default:
            break;
            
    }
    return state
}
