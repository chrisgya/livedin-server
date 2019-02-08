export const CapitalizeFirstLetter = (str: string | null) => {
    if(!str){
        return str;
    }
    return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
}


export const addDays = (date: Date, days: number) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }