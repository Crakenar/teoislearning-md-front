import {reactive} from "vue";

export const store = reactive({
    mockAccount: {
        username: 't',
        password: 't'
    },
    authenticated: false,
    setAuthenticated(status: boolean) {
        this.authenticated = status;
    },
    logout(){
        this.authenticated = false;
    }
});