import { Constants } from '../Constants/Constants';

export const ResetAction = ()=> (dispatch) => {
  try {
    dispatch(
      {
        type : Constants.RESET_STATE
      }
    )
  } catch (error) {
    console.log(error);
  }
};