import { BindAll } from 'lodash-decorators';

import { ICountry } from 'shared/types/models';

import { convertCountryResponse } from '../converters';
import BaseApi from './BaseApi';
import { ICountryResponse } from '../types/Country';

@BindAll()
class Country extends BaseApi {

  public async loadCountries(): Promise<ICountry[]> {
    const response = await this.actions.get<ICountryResponse[]>({
      url: `countries`,
    });
    // return convertCountryResponse(response.data);
    return this.handleResponse(response, convertCountryResponse);
  }

}

export default Country;
