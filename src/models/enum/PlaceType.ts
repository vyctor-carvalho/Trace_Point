/**
 * @enum PlaceType
 * @description Define os tipos de lugares que podem ser registrados na aplicação.
 */
export enum PlaceType {

    /**
     * @member touristic
     * @description Local de interesse turístico.
     * (Note: Nome original 'turistc' foi mantido, mas 'touristic' é a grafia comum).
     */
    turistc = "turistc", // Possível typo: "touristic"

    /**
     * @member restaurant
     * @description Estabelecimento gastronômico, como restaurante, bar, café.
     */
    restaurant = "restaurant",

    /**
     * @member museum
     * @description Museu ou instituição similar com exposições.
     */
    museum = "museum",

    /**
     * @member historic
     * @description Local de relevância histórica.
     */
    historic = "historic",

    /**
     * @member market
     * @description Mercado, feira ou similar.
     */
    market = "market"
}