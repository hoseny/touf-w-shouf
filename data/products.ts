export interface Product {
    id?: number;
    Rate_Review: number;
    prog_Code: number;
    prog_year: number;
    progName: string;
    StartPrice: number | undefined;
    IMG_Path: string;

    // rate_review: number;
    // code: number;
    // programyear: number;
    // programname: string;
    // img_path: string;
    // startprice?: number;

    rating: number;
    offerPrice?: number | null;
    languagecode: number;
}

// export interface Product {
//     id?: string;
//     Rate_Review: number | undefined;
//     prog_Code: number | undefined;
//     prog_year: number | undefined ;
//     progName: string | undefined;
//     StartPrice: number | undefined;
//     IMG_Path: string | undefined;

//     rate_review?: number;
//     code?: number;
//     programyear?: number;
//     programname?: string;
//     img_path?: string;
//     startprice?: number | undefined;

//     rating: number | undefined;
//     languagecode: number;
//     offerPrice: number | null | undefined;
// }
