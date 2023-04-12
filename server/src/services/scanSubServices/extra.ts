export class extraService {
  static async fetchDomain(url: string) {
    // fetches domain from any kind of url
    const match = url.match(/^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/\n]+)/im);
    if (match) {
      return match[1];
    } else {
      return null;
    }
  }

  static async verifyUrl(url: string) {
    // verifies url
    const regex = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
      'i',
    ); // fragment locator
    return regex.test(url);
  }
}