/* eslint-disable no-unused-vars */
import { useDispatch } from "react-redux";
import {findAllExercises} from "../services/exercisesService";
import { useAuth } from "./useAuth";
import { useSelector } from "react-redux";
import { loadingExercises } from "../store/slices/exercises/exerciseSlice";


export const useExercise = () => {
    const { exercises } = useSelector((state) => state.exercises);
    const { handlerLogout } = useAuth();
    //const dispath = useDispatch();
    const getExercises = async () => {
        try {
            const res = await findAllExercises();
            console.log(res);
            //dispath(res);
            return loadingExercises(res.data);
        } catch (error) {
            if (error.response?.status == 401) {
            handlerLogout();
            }
        }
    };
    return {
        getExercises,
        exercises,
    };
};

