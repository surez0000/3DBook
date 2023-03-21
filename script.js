const book = document.querySelector('.book');
const paragraph = getpara();

function getChunk(text, startIndex, length) {

    var truncatedText = text.substr(startIndex, length);
    var lastIndex = truncatedText.lastIndexOf(" ")
    if (text[length] !== " " && lastIndex > 0) {
        truncatedText = truncatedText.substr(0, lastIndex);
    }
    console.log(lastIndex + lastIndex)
    return truncatedText;
}
  

let charIndex = 0;
const myDiv = document.getElementById("myDiv");
const charsPerPage = calculateCharacterCapacity(myDiv);
console.log("Characters capacity:", charsPerPage);

let count = 0
let pageNumber = 0
while (charIndex < paragraph.length) {
    const page = document.createElement('div');
    page.className = 'page';
    count = count + 1
    const frontPageContent = getChunk(paragraph, charIndex, charsPerPage);
    charIndex += frontPageContent.length;

    const backPageContent = getChunk(paragraph, charIndex, charsPerPage);
    charIndex += backPageContent.length;
    page.setAttribute('index', count);
    page.innerHTML = `
        <div class="content frontPage"> 
            <pre> ${frontPageContent}</pre>
            <span class="pageNumber">${pageNumber + 1}</span>
        </div>
        <div class="content backPage"> 
            <pre> ${backPageContent}</pre>
            <span class="pageNumber">${pageNumber + 2}</span>
        </div>
        
    `;
    pageNumber = pageNumber + 2
    book.appendChild(page);
}

const pages = document.querySelectorAll('.page');
let openPages = [];

pages.forEach((page, index) => {
    page.style.zIndex = pages.length - index + 10;

    page.addEventListener('click', () => {
        if (index % 2 === 0) {
            if (openPages.includes(page)) {
                openPages = openPages.filter(openPage => openPage !== page);
                page.classList.remove('turn');
                alterZindex(page,pages,"remove");
            } else {
                openPages.push(page);
                page.classList.add('turn');
                alterZindex(page,pages,"add");
            }
        } else {
            if (openPages.includes(page)) {
                openPages = openPages.filter(openPage => openPage !== page);
                page.classList.remove('turn');
                alterZindex(page,pages,"remove");
            } else {
                openPages.push(page);
                page.classList.add('turn');
                alterZindex(page,pages,"add");
            }
        }
    });
});
function calculateCharacterCapacity(container) {
    // Create an invisible element with the same styling as the container
    const testElement = document.createElement("span");
    testElement.style.cssText = container.style.cssText;
    testElement.style.visibility = "hidden";
    testElement.style.whiteSpace = "nowrap";
    testElement.textContent = "c"; // Use a character with a typical width
    document.body.appendChild(testElement);
  
    // Measure the dimensions of the test element
    const testElementWidth = testElement.offsetWidth;
    const testElementHeight = testElement.offsetHeight;
  
    // Remove the test element from the DOM
    document.body.removeChild(testElement);
  
    // Calculate the dimensions of the container
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
  
    // Calculate how many characters can fit horizontally and vertically
    const charsPerRow = Math.floor(containerWidth / testElementWidth);
    const numRows = Math.floor(containerHeight / testElementHeight);
  
    // Calculate the total number of characters that can fit in the container
    const totalCharacters = charsPerRow * numRows;
  
    return totalCharacters;
  }
  
function alterZindex(page,pages,type){
    setTimeout(function(){
        if(type === "add"){
            var index = (parseInt(page.style.zIndex) + (parseInt(page.getAttribute('index')) + 1)) * 2
            page.style.zIndex  = index / 2 ? index : index + 1 ;
        }else{
            page.style.zIndex  = (parseInt(page.style.zIndex) / 2) - (parseInt(page.getAttribute('index')) + 1)
        }
    }.bind(page,pages,type),250)
    
}

function getpara(){
    
    var para = "In two more cases of sudden deaths, a 30-year-old woman who was dancing at a wedding ceremony in Khammam collapsed and died while a 55-year-old government official in Bhopal died while dancing at a party to “Bas aaj ki raat hai zindagi” during a video call with his family.\nRani, from Alleepuram on the outskirts of Khammam town, was dancing at a relative’s wedding with other women who had gathered to celebrate the event in Seethampet village.\n\nREAD ALSO\n30-year-old woman collapses, dies while dancing at wedding in Khammam\n\nIn yet another case of a young person dying suddenly, a 30-year-old woman, who was dancing at a wedding ceremony, collapsed and died in Khammam. Although the incident happened on March 16, it was reported only on Monday.\n\n\nTowards the end of the wedding, when the bride was being sent home with her husband, Rani collapsed and fell to the ground. Her relatives rushed her to a local hospital where she was declared dead on arrival.\n\nThe doctors were not able to give the exact cause of death. Surendra Kumar Dixit, who was the assistant director of Bhopal postal circle, suffered a cardiac arrest. “It was his last video call to his wife and daughter. He was dancing to his favourite song and showing it to his family when he collapsed,” his brother Bhupendra Dixit, the chief municipal officer of Barwani civic body, told TOI on Monday.\n“The colleague who was holding his phone was the first person to reach out to him when he collapsed. In just 5-7 minutes, he was no more. His wife could not believe it, as she had seen him dancinga few minutes ago,” the anguished brother said.\n\nREAD NEXT:\nEvery downturn is actually a boon for Indian software companies: Infosys founder Narayana Murthy\nIranian foundation offers land to Salman Rushdie's attacker\nHow India’s doing with mopeds what US is trying with Teslas\nWhy India must tap NRI dollars now to save rupee\nNikki Yadav murder case: Sahil Gehlot and aides planned to turn murder into accident\nTwo-wheeler rider killed in accident in Karnataka\nHow 4 brothers broke Sri Lanka's economy in just 2 years\nCLASSIC\nTaps to run dry on Thursday\nUK supermarkets ration fruits, vegetables amid widespread shortages\nHow Biden pulled off a secret journey to Ukraine\nLONG READ\nVenkatesh Prasad, Aakash Chopra in bitter Twitter war\nTurkey-Syria earthquake: India always ready to be first-responder, says PM Modi\nCongress-led alliance will form govt in 2024, says Mallikarjun Kharge in Nagaland\n'Election season has surely started in London, New York': Jaishankar questions timing of BBC series on PM Modi\nIND vs AUS: Virat Kohli breaks Virender Sehwag's record\nOnline gaming romance turns sour: Pakistani girl who married Indian boy repatriated to her country\n2002 Godhra train burning: Convicts cite Rajiv Gandhi assassination case, seek release\nWhy India must help Pakistanis in their biggest crisis\nMeghalaya govt denied permission for PM Modi's rally in Tura: BJP\nPutin says Russia suspending participation in New START treaty with US: All you need to know\nWhy India never stopped complaining about railway meals\nLONG READ\n'PM Modi sent troops to LAC, not Rahul Gandhi': Jaishankar hits out at Congress\nTwo teachers caught over illicit relationship, paraded by villagers in Telangana\nKSRTC’s 'Ambaari Utsav' buses to run on 8 intercity routes\nJasprit Bumrah yet to get clearance from NCA, BCCI to monitor workload ahead of IPL: Report\n1\n2\n3\n4\n5\n6\n7\n8\nShare to Twitter\nWATCH\nOn Cam: Postal department official collapses, dies while dancing at party in Bhopal"
    return para;
}
