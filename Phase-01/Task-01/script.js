const texts = [
    "The Statue of Liberty is a colossal neoclassical sculpture on Liberty Island in New York Harbor within New York City, in the United States. The copper statue, a gift from the people of France to the people of the United States, was designed by French sculptor Frédéric Auguste Bartholdi and its metal framework was built by Gustave Eiffel. Dedicated on October 28, 1886, it was a centennial gift to the United States from France.",
    "The Colosseum, also known as the Flavian Amphitheatre, is an oval amphitheater in the center of the city of Rome, Italy. Built of travertine limestone, tuff, and brick-faced concrete, it is the largest amphitheater ever built. Construction began under the emperor Vespasian in AD 72 and was completed in AD 80 under his successor and heir, Titus. The Colosseum could hold between 50,000 and 80,000 spectators and was used for gladiatorial contests and public spectacles such as mock sea battles, animal hunts, executions, re-enactments of famous battles, and dramas based on Classical mythology.",
    "The Pyramids of Giza consist of the Great Pyramid of Giza (also known as the Pyramid of Khufu or the Pyramid of Cheops), the Pyramid of Khafre, and the Pyramid of Menkaure, along with their associated pyramid complexes and the Great Sphinx of Giza. It is the oldest of the Seven Wonders of the Ancient World, and the only one to remain largely intact. Egyptologists believe that the pyramid was built as a tomb for Fourth Dynasty Egyptian pharaoh Khufu over an approximately 20-year period concluding around 2560 BC.",
    "The Machu Picchu is a 15th-century Inca citadel located in the Eastern Cordillera of southern Peru on a 2,430-meter (7,970 ft) mountain ridge. Most archaeologists believe that Machu Picchu was constructed as an estate for the Inca emperor Pachacuti (1438–1472). Often mistakenly referred to as the 'Lost City of the Incas', it is perhaps the most familiar icon of Inca civilization. The Incas built the estate around 1450, but abandoned it a century later at the time of the Spanish conquest. Although known locally, it was unknown to the outside world before being brought to international attention in 1911 by the American historian Hiram Bingham.",
    "The Sydney Opera House is a multi-venue performing arts center at Sydney Harbour in Sydney, New South Wales, Australia. It is one of the 20th century's most famous and distinctive buildings. Designed by Danish architect Jørn Utzon, but completed by an Australian architectural team led by Peter Hall, the building was formally opened on 20 October 1973 after a gestation beginning with Utzon's 1957 selection as winner of an international design competition.",
    "The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel, whose company designed and built the tower. Constructed from 1887 to 1889 as the entrance to the 1889 World's Fair, it was initially criticized by some of France's leading artists and intellectuals for its design, but it has become a global cultural icon of France and one of the most recognizable structures in the world. The Eiffel Tower is the most-visited paid monument in the world; 6.91 million people ascended it in 2015.",
    "The Taj Mahal is an ivory-white marble mausoleum on the right bank of the river Yamuna in the Indian city of Agra. It was commissioned in 1631 by the Mughal emperor Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal; it also houses the tomb of Shah Jahan himself. The Taj Mahal was designated as a UNESCO World Heritage Site in 1983 for being 'the jewel of Muslim art in India and one of the universally admired masterpieces of the world's heritage'.",
    "The Great Wall of China is a series of fortifications made of stone, brick, tamped earth, wood, and other materials, generally built along an east-to-west line across the historical northern borders of China to protect the Chinese states and empires against the raids and invasions of the various nomadic groups of the Eurasian Steppe with an eye to expansion. Several walls were built from as early as the 7th century BC, with later ones extending and strengthening the fortifications."

];
const textDisplay = document.getElementById('text-display');
const userInput = document.getElementById('user-input');
const resultDisplay = document.getElementById('result');
const startButton = document.getElementById('start-button');

let startTime, endTime;
let currentTextIndex = 0;

function getRandomText() {
    return texts[Math.floor(Math.random() * texts.length)];
}

function displayText() {
    const randomText = getRandomText();
    textDisplay.innerHTML = randomText.split('').map(char => `<span>${char}</span>`).join('');
}

function startTest() {
    displayText();
    userInput.value = '';
    userInput.focus();
    startTime = Date.now();
    resultDisplay.textContent = '';
    startButton.disabled = true;
    currentTextIndex = 0;
}

function endTest() {
    const endTime = Date.now();
    const elapsedTime = (endTime - startTime) / 1000; // Time in seconds
    const typedText = userInput.value.trim();
    const wordCount = typedText.split(/\s+/).length;
    const wpm = Math.round((wordCount / elapsedTime) * 60); // Words per minute
    resultDisplay.textContent = `Your typing speed: ${wpm} WPM`;
    startButton.disabled = false;
}

userInput.addEventListener('input', function() {
    const typedChars = userInput.value;
    const displayedChars = textDisplay.querySelectorAll('span');
    
    displayedChars.forEach((char, index) => {
        if (index < typedChars.length) {
            char.classList.remove('correct', 'incorrect');
            if (typedChars[index] === char.textContent) {
                char.classList.add('correct');
            } else {
                char.classList.add('incorrect');
            }
        } else {
            char.classList.remove('correct', 'incorrect');
        }
    });

    if (userInput.value === textDisplay.textContent) {
        endTest();
    }
});

startButton.addEventListener('click', startTest);
