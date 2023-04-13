import axios from 'axios';
import * as cheerio from 'cheerio';
import { portService } from './port';

export class basicService {
  static async gatherBasic(url: string) {
    return new Promise(async (resolve, reject) => {
      let basic = {};

      await axios.get(url).then((response) => {
        const $ = cheerio.load(response.data);
        const title = $('title').text();
        basic = {
          url: url,
          title: title,
          status: response.status,
          contentLength: response.headers['content-length'] || `${response.data.length / 1000} KB}`
        }
      }).catch((error) => {
        let title = "";
        if (error.response?.data !== undefined) {
          const $ = cheerio.load(error.response?.data);
          title = $('title').text();
        } else {
          title = "Error";
        }
        basic = {
          url: url,
          title: title,
          status: error.response?.status || 500,
          contentLength: error.response?.headers['content-length'] ? `${error.response?.headers['content-length'] / 1000} KB` : "0 KB"
        }
      })
      return resolve(basic);
    })
  }

  static async bulkBasic(urls: string[], scanMode: string) {
    return Promise.all(urls.map(async (url) => {
      return await this.gatherBasic(url)
    }));
  }
}