/**
 * @typedef {Object} DtoIn
 * @property {number} count Počet zaměstnanců, které se mají vygenerovat.
 * @property {{min: number, max: number}} age Věkové pásmo (minimální a maximální věk).
 */

/**
 * @typedef {Object} Employee
 * @property {"male" | "female"} gender Pohlaví ("male" nebo "female").
 * @property {string} birthdate Datum narození ve formátu ISO Date-Time (YYYY-MM-DDTHH:mm:ss.sssZ).
 * @property {string} name Křestní jméno.
 * @property {string} surname Příjmení.
 * @property {10 | 20 | 30 | 40} workload Výše pracovního úvazku (10, 20, 30 nebo 40h/týdně).
 */

/**
 * @typedef {Employee[]} DtoOut
 */


// --- Pomocná Data pro Generování ---

// Pole pro generování křestních jmen a příjmení (cca 50 českých jmen/příjmení)
// Rozděleno podle pohlaví pro realistické přiřazování
const NAME_DATA = {
    male: [
        "Jan", "Petr", "Pavel", "Tomáš", "Martin", "Jiří", "Jakub", "Marek", "Lukáš", "Michal",
        "Václav", "Karel", "Filip", "Adam", "Ondřej", "David", "Vojtěch", "Daniel", "František", "Matěj",
        "Josef", "Milan", "Aleš", "Radek", "Roman", "Zdeněk"
    ],
    female: [
        "Jana", "Hana", "Anna", "Kateřina", "Lucie", "Tereza", "Klára", "Eliška", "Veronika", "Adéla",
        "Martina", "Pavlína", "Lenka", "Monika", "Petra", "Barbora", "Eva", "Alena", "Nikola", "Kristýna",
        "Vendula", "Šárka", "Zuzana", "Ivana", "Olga", "Markéta"
    ],
    surnames: [
        "Novák", "Svoboda", "Novotný", "Dvořák", "Černý", "Procházka", "Kučera", "Veselý", "Horák", "Němec",
        "Marek", "Pospíšil", "Jelínek", "Růžička", "Krejčí", "Fiala", "Sedláček", "Kříž", "Bartoš", "Kopecký",
        "Konečný", "Malý", "Soukup", "Štěpánek", "Trnka", "Musil", "Hrubý", "Holub", "Urban", "Vaněk",
        "Zeman", "Kovář", "Kadlec", "Beneš", "Kolář", "Král", "Šimek", "Rybář", "Liška", "Švec",
        "Doležal", "Šimková", "Kučerová", "Svobodová", "Nováková", "Dvořáková", "Černá", "Veselá", "Horáková", "Němcová"
    ]
};

// Povolené výše úvazků
const WORKLOADS = [10, 20, 30, 40];


// --- Pomocné Funkce ---

/**
 * Získá náhodné celé číslo v rozsahu [min, max] včetně.
 * @param {number} min Minimální hodnota.
 * @param {number} max Maximální hodnota.
 * @returns {number} Náhodné číslo.
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Vybere náhodnou položku z pole.
 * @template T
 * @param {T[]} array Pole.
 * @returns {T} Náhodná položka.
 */
function getRandomItem(array) {
    return array[getRandomInt(0, array.length - 1)];
}

/**
 * Generuje náhodné datum narození na základě věkového rozmezí.
 * @param {{min: number, max: number}} ageRange Věkové pásmo {min, max}.
 * @returns {string} Datum narození ve formátu ISO Date-Time.
 */
function generateBirthdate(ageRange) {
    const today = new Date();
    
    // Vypočítáme maximální a minimální rok narození
    // Maximální rok narození (pro minimální věk)
    // Např. minAge=19 -> maxBirthYear = 2025 - 19 = 2006. Osoba se narodila před 2006.
    const maxBirthYear = today.getFullYear() - ageRange.min;
    
    // Minimální rok narození (pro maximální věk)
    // Např. maxAge=35 -> minBirthYear = 2025 - 35 = 1990. Osoba se narodila po 1990.
    const minBirthYear = today.getFullYear() - ageRange.max;

    // Generujeme náhodný rok narození v rozsahu [minBirthYear, maxBirthYear]
    const birthYear = getRandomInt(minBirthYear, maxBirthYear);
    
    // Generujeme náhodný měsíc a den
    const birthMonth = getRandomInt(1, 12);
    const birthDay = getRandomInt(1, 28); // Používáme 28 pro jednoduchost a jistotu platného data

    // Sestavíme a vrátíme datum ve formátu ISO Date-Time (YYYY-MM-DDTHH:mm:ss.sssZ)
    // Hodiny, minuty, sekundy a milisekundy jsou nastaveny na 0, časové pásmo Z (UTC)
    const date = new Date(Date.UTC(birthYear, birthMonth - 1, birthDay)); // Měsíce jsou 0-11
    
    // Datum musí být v rozsahu, nesmí být v budoucnosti a nesmí být příliš staré
    if (date.getTime() > today.getTime()) {
        // Pokud je generované datum náhodou v budoucnosti, posuneme ho o rok zpět.
        date.setFullYear(date.getFullYear() - 1);
    }

    return date.toISOString();
}

/**
 * Generuje jednoho zaměstnance s náhodnými daty.
 * @param {{min: number, max: number}} ageRange Věkové pásmo pro generování data narození.
 * @returns {Employee} Objekt zaměstnance.
 */
function generateEmployee(ageRange) {
    // 1. Náhodné pohlaví
    const gender = getRandomItem(["male", "female"]);

    // 2. Náhodné jméno a příjmení
    const name = getRandomItem(NAME_DATA[gender]);
    // Příjmení je stejné pro obě pohlaví pro zjednodušení, nicméně je zde namixováno
    // mužské a ženské skloňování pro vyšší rozmanitost (např. Novák i Nováková).
    const surname = getRandomItem(NAME_DATA.surnames); 

    // 3. Náhodné datum narození
    const birthdate = generateBirthdate(ageRange);

    // 4. Náhodný úvazek
    const workload = getRandomItem(WORKLOADS);

    return {
        gender,
        birthdate,
        name,
        surname,
        workload
    };
}


// --- Hlavní Funkce ---

/**
 * Generuje seznam zaměstnanců na základě zadaných vstupních dat.
 * * @param {DtoIn} dtoIn Vstupní data (počet zaměstnanců a věkové pásmo).
 * @returns {DtoOut} Seznam vygenerovaných zaměstnanců.
 */
function main(dtoIn) {
    // Kontrola vstupních dat
    if (!dtoIn || typeof dtoIn.count !== 'number' || dtoIn.count < 0 || 
        !dtoIn.age || typeof dtoIn.age.min !== 'number' || typeof dtoIn.age.max !== 'number' ||
        dtoIn.age.min > dtoIn.age.max) {
        // V případě neplatného vstupu vrátíme prázdné pole nebo vhodnou chybu
        console.error("Chybná struktura nebo hodnoty vstupních dat (dtoIn).");
        return [];
    }

    /** @type {DtoOut} */
    const employees = [];

    // Generování požadovaného počtu zaměstnanců
    for (let i = 0; i < dtoIn.count; i++) {
        employees.push(generateEmployee(dtoIn.age));
    }

    return employees;
}

// --- Příklad Použití ---

// Ukázka vstupních dat dle zadání
const dtoInExample = {
    count: 50,
    age: {
        min: 19,
        max: 35
    }
};

// Spuštění hlavní funkce
const dtoOutExample = main(dtoInExample);

console.log(`Vygenerováno ${dtoOutExample.length} zaměstnanců.`);
console.log("Příklad prvních dvou záznamů:");
console.log(JSON.stringify(dtoOutExample.slice(0, 2), null, 2));

// Export funkce pro použití v jiném prostředí (např. Node.js modul)
// V prostředí prohlížeče to není nutné, ale je to dobrý zvyk.
// export { main };