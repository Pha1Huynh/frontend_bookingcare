import actionTypes from "./actionTypes";
import { toast } from "react-toastify";
import {
  saveDetailDoctorService,
  getAllDoctor,
  getTopDoctorHomeService,
  editUserService,
  deleteUserService,
  getAllUsers,
  getAllCodeService,
  createNewUserService,
  getAllSpecialty,
  getAllClinic,
} from "../../services/userService";
// export const fetchGenderStart = () => ({
//   type: actionTypes.FETCH_GENDER_START,
// });

//GENDER
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER_START,
      });
      let res = await getAllCodeService("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (e) {
      dispatch(fetchGenderFailed());
      console.log("fetch gender start error", e);
    }
  };
};
export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});
export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});
//POSITION
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("Position");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (e) {
      dispatch(fetchPositionFailed());
      console.log("fetch Position start error", e);
    }
  };
};
export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});
export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

//ROLE
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("Role");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (e) {
      dispatch(fetchRoleFailed());
      console.log("fetch Role start error", e);
    }
  };
};
export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});
export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

//CRUD user
export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER_START,
      });
      let res = await createNewUserService(data);
      if (res && res.errCode === 0) {
        toast.success("Create a new user succeed!");
        dispatch(saveUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        dispatch(saveUserFailed());
      }
    } catch (e) {
      dispatch(saveUserFailed());
      console.log("fetch gender start error", e);
    }
  };
};

export const saveUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});
export const saveUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});

export const fetchAllUserStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("ALL");
      if (res && res.errCode === 0) {
        dispatch(fetchAllUserSuccess(res.users.reverse()));
      } else {
        dispatch(fetchAllUserFailed());
      }
    } catch (e) {
      dispatch(fetchAllUserFailed());
      console.log("fetch Role start error", e);
    }
  };
};

export const fetchAllUserSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  users: data,
});
export const fetchAllUserFailed = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAILED,
});

export const deleteAUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(userId);
      if (res && res.errCode === 0) {
        toast.success("Delete a user succeed!");
        dispatch(saveUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        toast.error("Cannot delete a user!");

        dispatch(saveUserFailed());
      }
    } catch (e) {
      toast.error("Cannot delete a user!");
      dispatch(saveUserFailed());
    }
  };
};

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});
export const deleteUserFaild = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

export const editAUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(data);
      if (res && res.errCode === 0) {
        toast.success("update a user succeed!");
        dispatch(editUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        toast.error("Cannot update a user!");

        dispatch(editUserFailed());
      }
    } catch (e) {
      toast.error("Cannot update a user!");
      dispatch(editUserFailed());
    }
  };
};

export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});
export const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});

export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeService("");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
          dataDoctor: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
      });
    }
  };
};
//get all doctor
export const fetchAllDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctor();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
          dataDr: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
      });
    }
  };
};

//update doctor

export const saveDetailDoctorAction = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailDoctorService(data);
      if (res && res.errCode === 0) {
        toast.success("update a doctor succeed!");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
        });
      } else {
        console.log("check error", res);
        toast.error("ERROR, Cannot update a doctor!");

        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
        });
      }
    } catch (e) {
      toast.error("ERROR, Cannot update a doctor!");
      console.log(" error");

      dispatch({
        type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
      });
    }
  };
};

//get allcode time
export const fetchAllScheduleTime = (type) => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("TIME");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_CODE_SCHEDULE_TIME_SUCCESS,
          dataTime: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_CODE_SCHEDULE_TIME_FAILED,
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.FETCH_ALL_CODE_SCHEDULE_TIME_FAILED,
      });
    }
  };
};

//Doctor Price
export const getRequiredDoctorInfor = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_START,
      });
      let resPrice = await getAllCodeService("PRICE");
      let resPayment = await getAllCodeService("PAYMENT");
      let resProvince = await getAllCodeService("PROVINCE");
      let resSpecialty = await getAllSpecialty();
      let resClinic = await getAllClinic();
      if (
        resPrice &&
        resPrice.errCode === 0 &&
        resPayment &&
        resPayment.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0 &&
        resSpecialty &&
        resSpecialty.errCode === 0 &&
        resClinic &&
        resClinic.errCode === 0
      ) {
        let data = {
          resPrice: resPrice.data,
          resPayment: resPayment.data,
          resProvince: resProvince.data,
          resSpecialty: resSpecialty.data,
          resClinic: resClinic.data,
        };
        dispatch(fetchAllRequiredDoctorInfoSuccess(data));
      } else {
        dispatch(fetchAllRequiredDoctorInfoFailed());
      }
    } catch (e) {
      dispatch(fetchAllRequiredDoctorInfoFailed());
      console.log("fetch gender start error", e);
    }
  };
};
export const fetchAllRequiredDoctorInfoSuccess = (allRequiredData) => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS,
  data: allRequiredData,
});
export const fetchAllRequiredDoctorInfoFailed = () => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED,
});
