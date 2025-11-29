
export function main(dtoIn) {
    
    const MALE_NAMES = ["Jan", "Petr", "Pavel", "Tomáš", "Vratislav", "Jiří", "Martin", "Jakub"];
    const FEMALE_NAMES = ["Anna", "Jana", "Marie", "Hana", "Lenka", "Jiřina", "Klára", "Veronika"];

    const MALE_SURNAMES = ["Novák", "Svoboda", "Dvořák", "Černý", "Procházka", "Sýkora", "Jelínek", "Kučera"];
    const FEMALE_SURNAMES = ["Nováková", "Svobodová", "Dvořáková", "Černá", "Procházková", "Ptáčková", "Jelínková", "Kučerová"];

    const WORKLOADS = [10, 20, 30, 40];

    // pomocná funkce pro náhodný výběr z pole
    const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
    
    // náhodné číslo 
    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    // výpočet věkových hranic 

    const currentDate = new Date();
    
    const maxBirthdate = new Date();
    maxBirthdate.setFullYear(currentDate.getFullYear() - dtoIn.age.max);

    const minBirthdate = new Date();
    
    minBirthdate.setFullYear(currentDate.getFullYear() - dtoIn.age.min);
    minBirthdate.setDate(minBirthdate.getDate() - 1); 
    
    // Hhranice v milisekundách 
    const maxTimestamp = minBirthdate.getTime(); // nejmladší 
    const minTimestamp = maxBirthdate.getTime(); // nejstarší 

    // generování změstnanců 
    const dtoOut = [];

    for (let i = 0; i < dtoIn.count; i++) {
        const gender = getRandomElement(["male", "female"]);
        
        let name, surname;
        if (gender === "male") {
            name = getRandomElement(MALE_NAMES);
            surname = getRandomElement(MALE_SURNAMES);
        } else {
            name = getRandomElement(FEMALE_NAMES);
            surname = getRandomElement(FEMALE_SURNAMES);
        }
        
        // náhodný timestamp 
        const randomTimestamp = getRandomInt(minTimestamp, maxTimestamp);
        const birthdate = new Date(randomTimestamp).toISOString();

        const workload = getRandomElement(WORKLOADS);

        dtoOut.push({
            gender,
            birthdate,
            name,
            surname,
            workload
        });
    }

    return dtoOut;
}
