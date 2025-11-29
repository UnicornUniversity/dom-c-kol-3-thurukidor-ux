/**
 * Generuje seznam zaměstnanců s náhodně vybranými atributy.
 *
 * @param {object} dtoIn - Vstupní data.
 * @param {number} dtoIn.count - Počet zaměstnanců k vygenerování.
 * @param {object} dtoIn.age - Věkové pásmo.
 * @param {number} dtoIn.age.min - Minimální věk.
 * @param {number} dtoIn.age.max - Maximální věk.
 * @returns {Array<object>} Pole vygenerovaných zaměstnanců.
 */
export function main(dtoIn) {
    // --- 1. Pomocná Data a Konstanty ---
    
    // Zkrácený seznam pro demonstraci, ve skutečnosti by měl být větší (cca 50)
    const MALE_NAMES = ["Jan", "Petr", "Pavel", "Tomáš", "Vratislav", "Jiří", "Martin", "Jakub"];
    const FEMALE_NAMES = ["Anna", "Jana", "Marie", "Hana", "Lenka", "Jiřina", "Klára", "Veronika"];

    const MALE_SURNAMES = ["Novák", "Svoboda", "Dvořák", "Černý", "Procházka", "Sýkora", "Jelínek", "Kučera"];
    const FEMALE_SURNAMES = ["Nováková", "Svobodová", "Dvořáková", "Černá", "Procházková", "Ptáčková", "Jelínková", "Kučerová"];

    const WORKLOADS = [10, 20, 30, 40];

    // Pomocná funkce pro náhodný výběr z pole
    const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
    
    // Náhodné číslo v rozsahu [min, max]
    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    // --- 2. Výpočet Věkových Hranic (pro Datum Narození) ---

    const currentDate = new Date();
    
    // Nejstarší možné datum narození (pro max věk)
    // Např. pro max věk 35, nejstarší datum narození je (aktuální rok - 35)
    const maxBirthdate = new Date();
    maxBirthdate.setFullYear(currentDate.getFullYear() - dtoIn.age.max);

    // Nejmladší možné datum narození (pro min věk)
    // Např. pro min věk 19, nejmladší datum narození je (aktuální rok - 19)
    const minBirthdate = new Date();
    // Odčítáme 1 den (86400000 ms), aby byl minimální věk dosažen celý (tj. aby se generované datum NEdotklo aktuálního roku-min_age)
    minBirthdate.setFullYear(currentDate.getFullYear() - dtoIn.age.min);
    minBirthdate.setDate(minBirthdate.getDate() - 1); 
    
    // Hranice v milisekundách (timestamp)
    const maxTimestamp = minBirthdate.getTime(); // Nejmladší (aktuální rok - min_age)
    const minTimestamp = maxBirthdate.getTime(); // Nejstarší (aktuální rok - max_age)

    // --- 3. Generování Zaměstnanců ---
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
        
        // Náhodný timestamp v povoleném rozsahu (mezi minTimestamp a maxTimestamp)
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

// Při použití v Node.js modulu `node:test` je vyžadován export.
// (Kód pro testování není součástí řešení, ale je vidět v zadání.)
// const dtoIn = { count: 5, age: { min: 20, max: 40 } };
// console.log(main(dtoIn));