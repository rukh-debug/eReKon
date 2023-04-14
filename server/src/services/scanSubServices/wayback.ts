
import axios from "axios";

export class waybackService {
  static async getLinks(url: string): Promise<string[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await axios.get(
          `http://web.archive.org/cdx/search/cdx?url=${url}/*&output=json&fl=original&collapse=urlkey`
        )
        let raw: string[] = []
        let info = response.data
        info.map((link: string[], index: number) => {
          if (index !== 0) {
            raw.push(`${link[0]}`)
          }
        })
        return resolve(raw)
      } catch (error: any) {
        console.log(error)
        return reject(error)
      }
    })
  }
}
