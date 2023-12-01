import axios from "axios";

export const createApplication = (application) => async(dispatch) => {
    dispatch({
        type: "APPLICATION_REQUEST",
    });

    try {
        const response = await axios.post("/api/applications/new_application", application);
        // const response2 = await axios.get('/api/books/allBook');

        dispatch({
            type: "APPLICATION_REQUEST_SUCCESS",
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: "APPLICATION_REQUEST_FAILED",
            payload: error,
        });
    }
};

export const updateApplication = (user) => async(dispatch) => {
    dispatch({
        type: "APPLICATION_REQUEST",
    });

    try {
        const response = await axios.post("/api/applications/applicant_update",user);
        // const response2 = await axios.get('/api/books/allBook');

        dispatch({
            type: "APPLICATION_REQUEST_SUCCESS",
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: "APPLICATION_REQUEST_FAILED",
            payload: error,
        });
    }
};

export const getApplications = ()=>async(dispatch) => {
    dispatch({
        type: "GET_APPLICATION_REQUEST"
    })

    try{
        const response = await axios.get("/api/applications/allApplications",);
        dispatch({
            type: "GET_APPLICATION_REQUEST_SUCCESS",
            payload: response.data,
        });
    }
    catch (error) {
        dispatch({
            type: "GET_APPLICATION_REQUEST_FAILED",
            payload: error,
        });
    }
}