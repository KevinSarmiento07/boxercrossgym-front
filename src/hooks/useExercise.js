import { useDispatch } from "react-redux";
import {findAllExercises} from "../services/exercisesService";
import { useAuth } from "./useAuth";

export const useExercise = () => {
    const { handlerLogout } = useAuth();
    const dispath = useDispatch();
    const getExercises = () => {
        try {
            const res = findAllExercises();
            dispath(res);
            return res.data;
        } catch (error) {
            if (error.response?.status == 401) {
            handlerLogout();
            }
        }
    };
    return {
        getExercises,
    };
};

