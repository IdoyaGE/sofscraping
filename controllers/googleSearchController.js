import Scraper from "../utils/scraper.js";
import Parser from "../utils/parser.js";

/**
 * Es una función asíncrona busca en Google los enlaces relacionados con el término de búsqueda.
 * @async
 * @function searchLinks
 * @param {string} query -Término de búsqueda a utilizar en Google.
 * @returns {Promise<Array<string>>} -Promesa que se resuelve con un array de enlaces encontrados en la búsqueda.
 */
async function searchLinks(query) {
//scraper: instancia para solicitudes HTTP a la página de Google y obtener su contenido en formato string.
  const scraper = new Scraper();
  await scraper.init();
  const encodedQuery =encodeURIComponent(query);
  const url = `https://www.google.com/search?q=${encodedQuery}`;
  const html = await scraper.getPageContent(url);
//parser: instancia para analizar el HTML y extraer los enlaces que se encuentran en la página.
  const parser = new Parser(html);
  const links = parser.getLinks();
  scraper.close();
  return links; 

}


export default {
    searchLinks
}