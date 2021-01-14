import { accessConstants } from '../constants';
import { accessService } from '../service';
import _ from 'lodash';

export const fetchWiegandSuccess = response => ({
  type: accessConstants.GET_ALL_WIEGAND_SUCCESS,
  payload: response
})


export const fetchWiegandFailure = response => ({
  type: accessConstants.GET_ALL_WIEGAND_FAILURE,
  payload: []
})

export const getAllWiegand = (filter) => {
  return dispatch => {
    return accessService.getAllWiegand(filter)
      .then(response => {
        let BadgeConfigs = (response.data && response.data.BadgeConfigs) || []
        BadgeConfigs = _.orderBy(BadgeConfigs, ['CreatedAt'], ['desc']);
        BadgeConfigs = _.orderBy(BadgeConfigs, ['CreatedAt'], ['desc']);

        BadgeConfigs = _.orderBy(BadgeConfigs, ['CreatedAt'], ['desc']);
        BadgeConfigs = _.orderBy(BadgeConfigs, ['CreatedAt'], ['desc']);
        dispatch(fetchWiegandSuccess(BadgeConfigs));
        return BadgeConfigs;
      },
        error => {
          dispatch(fetchWiegandFailure(error));
          return error;
        })
  }
}


export const fetchWiegandDetailSuccess = response => ({
  type: accessConstants.GET_WIEGAND_DETAIL_SUCCESS,
  payload: response
})

export const fetchWiegandDetailFailure = response => ({
  type: accessConstants.GET_WIEGAND_DETAIL_FAILURE,
  payload: {}
})

export const getWiegandById = (id) => {
  return dispatch => {
    return accessService.getWiegandById(id)
      .then(response => {
        let result = response.data || {};
        dispatch(fetchWiegandDetailSuccess(result));
        return result;
      },
        error => {
          dispatch(fetchWiegandDetailFailure(error));
          return error;
        })
  }
}

export const saveWiegand = (data) => {
  return dispatch => {
    return accessService.saveWiegand(data)
      .then(response => {
        if (data.WiegandID) {
          dispatch(getWiegandById(data.WiegandID));
        }
        else {
          dispatch(getAllWiegand());
        }
        return response;
      },
        error => {
          error.error = true;
          return error;
        })
  }
}

export const updateWiegand = (data) => {
  return dispatch => {
    return accessService.updateWiegand(data)
      .then(response => {
        return dispatch(getWiegandById(data.WiegandID));
      },
        error => {
          error.error = true;
          return error;
        })
  }
}

export const deleteWiegandById = (id, reason) => {
  return dispatch => {
    return accessService.deleteWiegandById(id, reason)
      .then(response => {
        dispatch(getAllWiegand());
        return response;
      },
        error => {
          error.error = true;
          return error;
        })
  }
}