
import axios from "axios";
import { possibleRedirects } from "../../config/payloads";


export class waybackService {
  static async getLinks(url: string): Promise<{ links: string[], uLinks: string[] }> {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await axios.get(
          `http://web.archive.org/cdx/search/cdx?url=${url}/*&output=json&fl=original&collapse=urlkey`
        )
        let links: string[] = []
        let uLinks: string[] = []
        let info = response.data
        info.map((link: string[], index: number) => {
          if (index !== 0) {
            if (possibleRedirects.some(str => link[0].includes(str))) {
              links.push(`${link[0]}`)
            }
            uLinks.push(`${link[0]}`)
          }
        })
        // return { links, uLinks }
        return resolve({ links, uLinks })
      } catch (error: any) {
        return reject(error)
      }
    })
  }
}
