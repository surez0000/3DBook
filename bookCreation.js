
async function main() {
    getpara(processPages);
    function processPages(paragraph) {
        function getChunk(text, startIndex, length) {
            var truncatedText = text.substr(startIndex, length);
            var lastIndex = truncatedText.lastIndexOf(" ")
            if (text[length] !== " " && lastIndex > 0) {
                truncatedText = truncatedText.substr(0, lastIndex);
            }
            return truncatedText;
        }

        let charIndex = 0;
        const myDiv = document.getElementById("myDiv");
        const charsPerPage = calculateCharacterCapacity(myDiv);
        console.log("Characters capacity:", charsPerPage);

        let count = 0;
        let pageNumber = 0;
        const book = document.getElementById("book");

        while (charIndex < paragraph.length) {
            const page = document.createElement('div');
            page.className = 'page';
            count = count + 1;
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
            pageNumber = pageNumber + 2;
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
                        alterZindex(page, pages, "remove");
                    } else {
                        openPages.push(page);
                        page.classList.add('turn');
                        alterZindex(page, pages, "add");
                    }
                } else {
                    if (openPages.includes(page)) {
                        openPages = openPages.filter(openPage => openPage !== page);
                        page.classList.remove('turn');
                        alterZindex(page, pages, "remove");
                    } else {
                        openPages.push(page);
                        page.classList.add('turn');
                        alterZindex(page, pages, "add");
                    }
                }
            });
        });
    }
}
main();
function calculateCharacterCapacity(container) {
    const testElement = document.createElement("span");
    testElement.style.cssText = container.style.cssText;
    testElement.style.visibility = "hidden";
    testElement.style.whiteSpace = "nowrap";
    testElement.textContent = "c";
    document.body.appendChild(testElement);

    const testElementWidth = testElement.offsetWidth;
    const testElementHeight = testElement.offsetHeight;
    document.body.removeChild(testElement);

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    const charsPerRow = Math.floor(containerWidth / testElementWidth);
    const numRows = Math.floor(containerHeight / testElementHeight);

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

function getpara(callback) {
    (async () => {
        try {
            const response = await fetch("./story.txt");
            if (!response.ok) {
                throw new Error("Error reading file");
            }

            const content = await response.text();
            callback(content);
        } catch (error) {
            console.error("Error:", error);
        }
    })();
}