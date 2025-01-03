    // En redux/selectors.ts
    import { RootState } from './store';
    
    export const selectUser = (state: RootState) => state.user.user;
    export const selectSpaces = (state: RootState) => state.spaces