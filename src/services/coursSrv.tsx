import axios from 'axios';
import {extractFilters} from '../helpers/extractFilters';
import {urls} from '../utils';

const coursSrv = {
  getPartnerList: (data: any) => {
    return new Promise(async (resolve, reject) => {
      return (
        axios
          .get(
            `${urls.courses}/partner-network/${data?.partner}/${
              data?.offset || 0
            }/${data?.limit || 10}?${extractFilters(data)}?${extractFilters({
              filters: data?.filters,
            })}`,
          )
          // .get(`${urls.comments}/${offset || 0}/${limit || 10}?${extractFilters({ filters })}`)
          .then(resp => {
            // console.log({resp});
            resolve(resp);
          })
          .catch(e => reject(e))
      );
    });
  },
};

export default coursSrv;
