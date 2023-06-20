import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/reducer";

const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();

export { dispatch };
